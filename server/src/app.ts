import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import passport from 'passport';

import passportConfig from 'config/passport';
import database from 'config/database';
import router from 'routes-express/index';
import { socketEvents, socketWrapper } from 'routes-socket/index';

const app = express();
app.set('trust proxy', 1);

// create sessions middleware
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    // set up sessions table in database
    client: database,
    collectionName: 'sessions'
  }),
  cookie: {
    secure: process.env.DEV ? false : true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day in ms
  }
});

// use session middleware in express
app.use(sessionMiddleware);

// use session middleware in socket
const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: `${process.env.API_ROUTE}/socket`,
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
});
io.use(socketWrapper(sessionMiddleware));
socketEvents(io);

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

// configure and start passport
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// use custom routes
app.use(router);

httpServer.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});
