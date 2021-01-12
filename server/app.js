const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const http = require('http');
const cors = require('cors');
const passport = require('passport');
const io = require('socket.io');

// set up sessions table in database
const database = require('./config/database');
const SessionStore = new MongoStore({
  mongooseConnection: database,
  collection: 'sessions'
});

// configure passport
require('./config/passport')(passport);

// configure custom routes
const router = require('./routes/router');

// start express app
const app = express();

// store http server to use custom socket connections
const server = http.createServer(app);
require('./routes/socket')(
  io(server, {
    path: process.env.API_ROUTE
  })
);

// enable cross-origin resource sharing
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST',
    optionsSuccessStatus: 200,
    credentials: true
  })
);

// use express built-in body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up connect-mongo session store
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: SessionStore,
    cookie: {
      secure: false, // set to true when https
      maxAge: 1000 * 60 * 60 * 24 // 1 day in ms
    }
  })
);

// start passport
app.use(passport.initialize());
app.use(passport.session());

// use custom routes
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});
