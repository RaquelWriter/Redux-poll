import {
  RECEIVE_USERS,
  SAVE_ANSWERS_IN_USERS,
  SAVE_QUESTION_IN_USERS,
} from '../actions/users';

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
    case SAVE_QUESTION_IN_USERS:
      const { id, author } = action;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: [...state[author].questions.concat([id])],
        },
      };
    default:
      return state;
  }
}
/* 
let users = {
  sarahedo: {
    id: 'sarahedo',
    password: 'password123',
    name: 'Sarah Edo',
    avatarURL: '/images/avatar_01.png',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne',
      '6ni6ok3ym7mf1p33lnez': 'optionOne',
      am8ehyc8byjqgar0jgpub9: 'optionTwo',
      loxhs1bqm25b708cmbf3g: 'optionTwo',
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
  }, */
