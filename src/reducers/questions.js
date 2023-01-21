import {
  RECEIVE_QUESTIONS,
  SAVE_ANSWERS,
  SAVE_QUESTION,
} from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return { ...state, ...action.questions };

    /* authedUser,
    qid,
    answer, */
    case SAVE_ANSWERS:
      const { authedUser, qid, answer } = action;

      if (!authedUser || !qid || !answer) {
        console.log('THERE IS A PROBLEM. No authedUser or qid or answer');
        return state;
      }
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser]),
          },
        },
      };
    case SAVE_QUESTION: {
      const { id, author, optionOne, optionTwo, timestamp } = action;

      if (!optionOne || !optionTwo || !author) {
        console.log('There was a problem. No optionOne, optionTwo or author');
        return state;
      }
      return {
        ...state,
        [id]: {
          id,
          author,
          optionOne,
          optionTwo,
          timestamp,
        },
      };
    }

    default:
      return state;
  }
}
