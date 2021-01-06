const router = require('express').Router();

///////////////////////////////////////////////////////////////////////////////
// TESTING CODE
  router.get('/', (req, res) => {
    res.redirect('/home');
  });
  router.get('/home', (req, res) => {
    console.log(req.user);
    res.send(`
      <div>user: ${req.user}</div>
      <div><a href='/register'>register</a></div>
      <div><a href='/login'>login</a></div>
      <div><a href='/logout'>logout</a></div>
    `);
  });
  router.get('/register', (req, res) => {
    res.send(`
      <h1>register</h1>
      <form action="/api/register" method="POST">
        <div>
          <label for="username">name</label>
          <input type="text" id="username" name="username" required>
        </div>
        <div>
          <label for="password">password</label>
          <input type="password" id="password" name="password" required>
        </div>
        <button type='submit'>register</button>
      </form>
      `);
  });
  router.get('/login', (req, res) => {
    res.send(`
      <h1>login</h1>
      <form action="/api/login" method="POST">
        <div>
          <label for="username">name</label>
          <input type="text" id="username" name="username" required>
        </div>
        <div>
          <label for="password">password</label>
          <input type="password" id="password" name="password" required>
        </div>
        <button type='submit'>login</button>
      </form>
    `);
  });
  router.get('/logout', (req, res) => {
    res.send(`
      <h1>logout</h1>
      <form action="/api/logout" method="POST">
        <button type='submit'>logout</button>
      </form>
    `);
  });
///////////////////////////////////////////////////////////////////////////////

// register user
const register = require('../functions/register');
router.post('/api/register', register);

// authorize user
const { login, logout } = require('../functions/authorize');
router.post('/api/login', login);
router.post('/api/logout', logout);

module.exports = router;
