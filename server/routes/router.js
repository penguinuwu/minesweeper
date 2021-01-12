const router = require('express').Router();
const API_ROUTE = process.env.API_ROUTE;

// test routes
if (process.env.TEST) router.get('/', require('../test'));

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
const playMulti = require('../bin/play/multi');
router.post(`${API_ROUTE}/play/multi`, playMulti);

module.exports = router;
