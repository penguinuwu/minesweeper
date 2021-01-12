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

  // solo play
  const playSolo = require('../bin/play/solo');
  router.post(`${API_ROUTE}/play/solo`, playSolo);

  // multiplayer play
  const playmulti = require('../bin/play/multi');
  router.post(`${API_ROUTE}/play/multi`, playmulti);

  return router;
};

module.exports = wrapper;
