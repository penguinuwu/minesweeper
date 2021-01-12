const router = require('express').Router();
const API_ROUTE = process.env.API_ROUTE;

const wrapper = (io) => {
  // test routes
  if (process.env.TEST) {
    const test = require('../test');
    router.get('/', test);
  }

  // authorize routes
  const register = require('../bin/authorize/register');
  const login = require('../bin/authorize/login');
  const logout = require('../bin/authorize/logout');
  router.post(`${API_ROUTE}/register`, register);
  router.post(`${API_ROUTE}/login`, login);
  router.post(`${API_ROUTE}/logout`, logout);

  return router;
};

module.exports = wrapper;
