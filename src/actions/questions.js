import { saveQuestionInUsers } from './users';
import { saveQuestionAnswer, saveQuestion } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWERS = 'SAVE_ANSWERS';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function saveAnswers(authedUser, qid, answer) {
  return {
    type: SAVE_ANSWERS,
    authedUser,
    qid,
    answer,
  };
}

export function saveQuestionToState(
  id,
  author,
  optionOne,
  optionTwo,
  timestamp
) {
  return {
    type: SAVE_QUESTION,
    id,
    author,
    optionOne,
    optionTwo,
    timestamp,
  };
}
// To use this function: store.dispatch(handleSaveAnswers(qid, answer))

export function handleSaveAnswers(qid, answer) {
  return (dispatch, getState) => {
    const authedUser = getState().login.authedUser;
    return saveQuestionAnswer({ authedUser, qid, answer })
      .then((result) => {
        dispatch(saveAnswers(authedUser, qid, answer));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function handleSaveQuestions(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    return saveQuestion({ optionOneText, optionTwoText, author })
      .then((result) => {
        const { id, author, optionOne, optionTwo, timestamp } = result;
        dispatch(
          saveQuestionToState(id, author, optionOne, optionTwo, timestamp)
        );
        dispatch(saveQuestionInUsers(id, author));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
