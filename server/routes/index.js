const router = require('express').Router();
const API_ROUTE = process.env.API_ROUTE;

const wrapper = (io) => {
  // test routes
  if (process.env.TEST) {
    const test = require('../test');
    router.get('/', test);
  }

  // register user
  const register = require('../bin/register');
  router.post(`${API_ROUTE}/register`, register);

  // authorize user
  const { login, logout } = require('../bin/authorize');
  router.post(`${API_ROUTE}/login`, login);
  router.post(`${API_ROUTE}/logout`, logout);

  return router;
};

module.exports = wrapper;
