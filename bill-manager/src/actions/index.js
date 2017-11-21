import { ADD_REMINDER, DELETE_REMINDER, SIGNED_IN }  from '../constants';

export const addReminder = (amount, description, paidBy, obligors, RefKey) => {
  const action = {
    type: ADD_REMINDER,
    amount,
    description,
    paidBy,
    obligors,
    RefKey
  }
  return action;
}

export const retrieveRecords = (historyRecords) => {
  const action = {
    type: "RETRIEVE",
    historyRecords
  }
  return action;
}

export const deleteRecords = (RefKey) => {
  const action = {
    type: "DELETERECORD",
    RefKey
  }
  return action;
}

export const switchRecord = (object) => {
  const action = {
    type: "SWITCH",
    object
  }
  return action;
}

export const deleteReminder = (id, RefKey) => {
  const action = {
    type: DELETE_REMINDER,
    id,
    RefKey
  }
  return action;
}

export const logUser = (email) => {
  const action = {
    type: SIGNED_IN,
    email
  }
  return action;
}
