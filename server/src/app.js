const express = require('express');
const port = process.env.PORT;

const database = require('./database/connection');
const { User, Game, Lobby } = require('./database/models');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const SessionStore = new MongoStore({
  mongooseConnection: database,
  collection: 'session'
});

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: SessionStore,
  cookie: {
    secure: false, // set to true when https
    maxAge: 1000 * 60 * 60 * 24 // 1 day in ms
  }
}));

app.get('/api/', (req, res) => {
  res.send(`Hello! ${req.session}`);
  console.log(req.session);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
