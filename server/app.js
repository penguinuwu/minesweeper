const express = require('express');
const app = express();

// set up sessions table in database
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const database = require('$/config/database');

// create sessions middleware
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: database,
    collection: 'sessions'
  }),
  cookie: {
    secure: false, // set to true when https
    maxAge: 1000 * 60 * 60 * 24 // 1 day in ms
  }
});

// use session middleware in express
app.use(sessionMiddleware);

// use session middleware in socket
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  path: `${process.env.API_ROUTE}/socket`,
  cors: {
    origin: process.env.CLIENT_URL,
    // methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});
require('$/routes/socket')(io);

// enable cross-origin resource sharing
const cors = require('cors');
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

// configure and start passport
const passport = require('passport');
require('$/config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// use custom routes
const router = require('$/routes/router');
app.use(router);

server.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});
