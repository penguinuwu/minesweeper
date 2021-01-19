const router = require('express').Router();
const API_ROUTE = process.env.API_ROUTE;

// test routes
if (process.env.TEST) {
  router.get('/favicon.ico', (req, res) => res.status(200));
  router.get('/', require('$/test'));
}

// authorize routes
const register = require('$/lib/authorize/register');
const login = require('$/lib/authorize/login');
const logout = require('$/lib/authorize/logout');
router.post(`${API_ROUTE}/register`, register);
router.post(`${API_ROUTE}/login`, login);
router.post(`${API_ROUTE}/logout`, logout);

// get user lobbies
const { lobbies, pastLobbies } = require('$/lib/game/user');
router.post(`${API_ROUTE}/lobbies`, lobbies);
router.post(`${API_ROUTE}/pastLobbies`, pastLobbies);

// solo play
const playSolo = require('$/lib/game/solo');
router.post(`${API_ROUTE}/play/solo`, playSolo);

// multiplayer play
const playMulti = require('$/lib/game/multi');
router.post(`${API_ROUTE}/play/multi`, playMulti);
// todo: multi lobbies

module.exports = router;
