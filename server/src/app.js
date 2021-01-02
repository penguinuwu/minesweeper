const express = require('express');
const session = require('express-session');

const database = require('./database/database');
const { User, Game, Lobby } = require('./database/models');

const mongo = require('connect-mongo');
const app = express();

const port = process.env.PORT;
const secret = process.env.SECRET;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
