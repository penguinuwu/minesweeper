const router = require('express').Router();
const API_ROUTE = process.env.API_ROUTE;

// register user
const register = require('../bin/register');
router.post(`${API_ROUTE}/register`, register);

// authorize user
const { login, logout } = require('../bin/authorize');
router.post(`${API_ROUTE}/login`, login);
router.post(`${API_ROUTE}/logout`, logout);

// play game
const {} = require('../bin/play');
router.post(`${API_ROUTE}/play`, play);

module.exports = router;
