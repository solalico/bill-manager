import { ADD_REMINDER, DELETE_REMINDER, SIGNED_IN } from '../constants';
import { dbRef } from '../firebase';
const reminder = (action) => {
  let { amount, description, paidBy, obligors } = action;
  return {
    amount,
    description,
    paidBy,
    obligors
  }
}

const initialState = {
  bills: [],
  RefKey: '',
  total: '0.00',
  d2RGU: '0.00',
  d2EVA: '0.00',
  RGU2EVA: '0.00',
  email: null,
  from: '',
  to: ''
}

const performAdding = (reminders, action) => {
  let split = (Math.round(action.amount/action.obligors.length * 100)/100).toFixed(2);
  switch(action.paidBy) {
    case 'D': {
      if (action.obligors.includes('RGU')) {
        reminders.d2RGU = (reminders.d2RGU - split).toFixed(2);
      }
      if (action.obligors.includes('EVA')) {
        reminders.d2EVA = (reminders.d2EVA - split).toFixed(2);
      }
      break;
    }
    case 'RGU': {
      if (action.obligors.includes('D')) {
        reminders.d2RGU = (Number(reminders.d2RGU) + Number(split)).toFixed(2);
      }
      if (action.obligors.includes('EVA')) {
        reminders.RGU2EVA = (reminders.RGU2EVA - split).toFixed(2);
      }
      break;
    }
    case 'EVA': {
      if (action.obligors.includes('D')) {
        reminders.d2EVA = (Number(reminders.d2EVA) + Number(split)).toFixed(2);
      }
      if (action.obligors.includes('RGU')) {
        reminders.RGU2EVA = (Number(reminders.RGU2EVA) + Number(split)).toFixed(2);
      }
      break;
    }
    default: break;
  }
  reminders.total= (Number(reminders.total) + Number(action.amount)).toFixed(2);
  return reminders;
}

const removeById = (state, id) => {
  let reminders = {...state};
  reminders.bills = [...state.bills];
  let bill = reminders.bills[id];
  let split = (Math.round(bill.amount/bill.obligors.length * 100)/100).toFixed(2);
  switch(bill.paidBy) {
    case 'D': {
      if (bill.obligors.includes('RGU')) {
        reminders.d2RGU = (Number(reminders.d2RGU) + Number(split)).toFixed(2);
      }
      if (bill.obligors.includes('EVA')) {
        reminders.d2EVA = (Number(reminders.d2EVA) + Number(split)).toFixed(2);
      }
      break;
    }
    case 'RGU': {
      if (bill.obligors.includes('D')) {
        reminders.d2RGU = (reminders.d2RGU - split).toFixed(2);
      }
      if (bill.obligors.includes('EVA')) {
        reminders.RGU2EVA = (Number(reminders.RGU2EVA) + Number(split)).toFixed(2);
      }
      break;
    }
    case 'EVA': {
      if (bill.obligors.includes('D')) {
        reminders.d2EVA = (reminders.d2EVA - split).toFixed(2);
      }
      if (bill.obligors.includes('RGU')) {
        reminders.RGU2EVA = (reminders.RGU2EVA - split).toFixed(2);
      }
      break;
    }
    default: break;
  }
  reminders.total = (reminders.total - bill.amount).toFixed(2);
  reminders.bills.splice(id, 1);
  return reminders;
}

const reminders = (state = initialState, action) => {
  let reminders = null;
  let url;
  switch(action.type) {
    case ADD_REMINDER:
      reminders = {...state};
      reminders.bills = [...state.bills, (reminder(action))];
      performAdding(reminders, action);
      url = 'bills/' + reminders.RefKey;
      dbRef.ref(url).set(reminders);
      return reminders;
    case DELETE_REMINDER:
      reminders = removeById(state, action.id, action.amount);
      url = 'bills/' + reminders.RefKey;
      dbRef.ref(url).set(reminders);
      return reminders;
    case SIGNED_IN:
      const { email } = action;
      reminders = {...state};
      reminders.email = email;
      return reminders;
    case 'SWITCH':
      console.log('happend');
      const { object } = action;
      reminders = {...state};
      reminders.total = object.total;
      reminders.d2RGU = object.d2RGU;
      reminders.d2EVA = object.d2EVA;
      reminders.RGU2EVA = object.RGU2EVA;
      reminders.from = object.from;
      reminders.to = object.to;
      reminders.bills = object.bills || [];
      reminders.RefKey = object.RefKey;
      return reminders;
    case 'DELETERECORD':
      const { RefKey } = action;
      reminders = {...state};
      if (reminders.RefKey === RefKey) {
        reminders.RefKey = '';
      }
      return reminders;
    default:
      return state;
  }
}

export default reminders;
