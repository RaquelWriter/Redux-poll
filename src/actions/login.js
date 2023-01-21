export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_INITIAL_AUTHED_USER = '';

export function login(userId) {
  return {
    type: LOGIN,
    payload: { authedUser: userId },
  };
}

export function logout(userId) {
  return {
    type: LOGOUT,
    payload: { authedUser: userId },
  };
}

export function setInitialAuthedUser(userId) {
  return {
    type: SET_INITIAL_AUTHED_USER,
    payload: { authedUser: userId },
  };
}
