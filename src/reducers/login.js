import { LOGIN, LOGOUT, SET_INITIAL_AUTHED_USER } from '../actions/login';

const initialState = {
  isLoggedIn: false,
  authedUser: '',
};

/* const checkUserCredentials = (username, password) => {
  const user = users[username];
  if (user) {
    if (user.password === password) {
      return true;
    }
  }
  return false;
}; */

export default function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      const { authedUser } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        authedUser: authedUser,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        authedUser: '',
      };
    case SET_INITIAL_AUTHED_USER:
      return {
        ...state,
        isLoggedIn: false,
        authedUser: '',
      };

    default:
      return state;
  }
}
