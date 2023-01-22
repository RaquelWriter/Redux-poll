import { generateUID } from '../utils/_DATA';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_ANSWERS_IN_USERS = 'SAVE_ANSWERS_IN_USERS';
export const SAVE_QUESTION_IN_USERS = 'SAVE_QUESTION_IN_USERS';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function saveAnswersInUsers(authedUser, qid, answer) {
  return {
    type: SAVE_ANSWERS_IN_USERS,
    authedUser,
    qid,
    answer,
  };
}

export function handleSaveAnswersInUsers(qid, answer) {
  return (dispatch, getState) => {
    const authedUser = getState().login.authedUser;
    dispatch(saveAnswersInUsers(authedUser, qid, answer));
  };
}

export function saveQuestionInUsers(id, author) {
  return {
    type: SAVE_QUESTION_IN_USERS,
    id,
    author,
  };
}
