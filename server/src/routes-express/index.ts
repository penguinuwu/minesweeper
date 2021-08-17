import { Router } from 'express';
import home from 'routes-express/home';

const router = Router();
const API_ROUTE = process.env.API_ROUTE;

// test routes
if (process.env.DEV) {
  router.get('/favicon.ico', (_req, res) => res.status(200));
  router.get('/', home);
}

// authorize routes
import register from 'routes-express/authorize/register';
import login from 'routes-express/authorize/login';
import logout from 'routes-express/authorize/logout';
import verify from 'routes-express/authorize/verify';
router.post(`${API_ROUTE}/register`, register);
router.post(`${API_ROUTE}/login`, login);
router.post(`${API_ROUTE}/logout`, logout);
router.post(`${API_ROUTE}/verify`, verify);

// get user lobbies
import { lobbies, pastLobbies } from 'routes-express/game/user';
router.post(`${API_ROUTE}/lobbies`, lobbies);
router.post(`${API_ROUTE}/pastLobbies`, pastLobbies);

// solo play
import playSolo from 'routes-express/game/solo';
router.post(`${API_ROUTE}/play/solo`, playSolo);

// multiplayer play
import playMulti from 'routes-express/game/multi';
router.post(`${API_ROUTE}/play/multi`, playMulti);
// todo: multi lobbies

export default router;
