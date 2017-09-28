import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS }  from '../constants';

export const addReminder = (amount, description) => {
  const action = {
    type: ADD_REMINDER,
    amount,
    description
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

export const clearReminders = () => {
  return {
    type: CLEAR_REMINDERS
  }
}
