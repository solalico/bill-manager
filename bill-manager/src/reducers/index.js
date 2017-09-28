import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const reminder = (action) => {
  let { amount, description } = action;
  return {
    id: Math.random(),
    amount,
    description
  }
}

const initialState = {
  bills: []
}

const removeById = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id !== id);
  return reminders;
}

const reminders = (state = initialState, action) => {
  let reminders;
  // state = read_cookie('reminders');
  switch(action.type) {
    case ADD_REMINDER:
      reminders = {...state};
      if (!reminders.bills) {
        reminders.bills = [];
      }
      reminders.bills.push(reminder(action));
      // bake_cookie('reminders', reminders);
      return reminders;
    case DELETE_REMINDER:
      reminders = removeById(state, action.id);
      bake_cookie('reminders', reminders);
      return reminders;
    case CLEAR_REMINDERS:
      reminders = [];
      bake_cookie('reminders', reminders);
      return reminders;
    default:
      return state;
  }
}

export default reminders;
