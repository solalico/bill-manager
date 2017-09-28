import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS, RETRIEVE } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const reminder = (action) => {
  let { amount, description, paidBy, obligors } = action;
  return {
    id: Math.random(),
    amount,
    description,
    paidBy,
    obligors
  }
}

const initialState = {
  bills: [],
  total: 0,
  d2RGU: 0,
  d2EVA: 0,
  RGU2EVA: 0
}

const getCookie = () => {
  if (read_cookie('bills')) {
    return read_cookie('bills');
  }
  return initialState;
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
  for (let i = 0; i < reminders.bills.length; i++) {
    if (reminders.bills[i].id === id) {
      let bill = reminders.bills[i];
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
      reminders.bills.splice(i, 1);
    }
  }

  return reminders;
}

const reminders = (state = initialState, action) => {
  let reminders = null;
  switch(action.type) {
    case ADD_REMINDER:
      reminders = {...state};
      reminders.bills = [...state.bills, (reminder(action))];
      performAdding(reminders, action);
      bake_cookie('bills', reminders);
      return reminders;
    case DELETE_REMINDER:
      reminders = removeById(state, action.id, action.amount);
      bake_cookie('bills', reminders);
      return reminders;
    case CLEAR_REMINDERS:
      reminders = {...state};
      reminders.bills = [];
      reminders.total = 0;
      reminders.d2RGU = 0;
      reminders.d2EVA = 0;
      reminders.RGU2EVA = 0;
      bake_cookie('bills', reminders);
      return reminders;
    case RETRIEVE:
      reminders = {...state};
      let cookie = getCookie();
      console.log(cookie);
      reminders.bills = [...cookie.bills];
      reminders.total = cookie.total;
      reminders.d2RGU = cookie.d2RGU;
      reminders.d2EVA = cookie.d2RGU;
      reminders.RGU2EVA = cookie.d2RGU;
      return reminders;
    default:
      return state;
  }
}

export default reminders;
