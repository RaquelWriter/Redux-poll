//import { getAuthedUser } from './authedUser';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { setInitialAuthedUser } from './login';
import { getInitialData } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const AUTHED_ID = '';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(setInitialAuthedUser(AUTHED_ID));
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}
