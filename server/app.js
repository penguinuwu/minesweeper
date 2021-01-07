const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const database = require('./config/database');
const SessionStore = new MongoStore({
  mongooseConnection: database,
  collection: 'session'
});

const app = express();

// enable cross 
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

// use express built-in body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// set up connect-mongo session store
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

// configure passport
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

const routes = require('./routes');
app.use(routes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
