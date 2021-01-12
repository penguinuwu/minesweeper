const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const http = require('http');
const cors = require('cors');
const passport = require('passport');

// set up sessions table in database
const database = require('./config/database');
const SessionStore = new MongoStore({
  mongooseConnection: database,
  collection: 'sessions'
});

// configure passport
require('./config/passport')(passport);

// start express app
const app = express();

// store http server
const server = http.createServer(app);
const io = require('socket.io')(server);

// configure custom routes
const routes = require('./routes')(io);

// enable cross-origin resource sharing
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: "GET,POST",
  optionsSuccessStatus: 200,
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

// start passport
app.use(passport.initialize());
app.use(passport.session());

// use custom routes
app.use(routes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
