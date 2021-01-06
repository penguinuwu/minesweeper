const router = require('express').Router();

// register user
const register = require('../functions/register');
router.post('/api/register', register);

// authorize user
const { login, logout } = require('../functions/authorize');
router.post('/api/login', login);
router.post('/api/logout', logout);

module.exports = router;
