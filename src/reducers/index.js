import { combineReducers } from 'redux';
// import authedUser from './authedUser';
import users from './users';
import questions from './questions';
import login from './login';

export default combineReducers({
  users,
  questions,
  login,
});
