import { RECEIVE_USERS, SAVE_ANSWERS_IN_USERS } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...state, ...action.users };
    case SAVE_ANSWERS_IN_USERS:
      const { authedUser, qid, answer } = action;
      if (!authedUser || !qid || !answer) {
        console.log('THERE IS A PROBLEM. No authedUser or qid or answer');
        return state;
      }
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    default:
      return state;
  }
}
