import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS, RETRIEVE }  from '../constants';

export const addReminder = (amount, description, paidBy, obligors) => {
  const action = {
    type: ADD_REMINDER,
    amount,
    description,
    paidBy,
    obligors
  }
  return action;
}

export const deleteReminder = (id) => {
  const action = {
    type: DELETE_REMINDER,
    id
  }
  return action;
}

export const retrieve = () => {
  const action = {
    type: RETRIEVE
  }
  return action;
}

export const clearReminders = () => {
  return {
    type: CLEAR_REMINDERS
  }
}
