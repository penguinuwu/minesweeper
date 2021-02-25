import * as Actions from './ActionTypes';

const login = (user) => ({
  type: Actions.LOGIN,
  payload: {
    username: user.username
  }
});

const logout = () => ({
  type: Actions.LOGOUT,
  payload: {}
});

export { login, logout };
