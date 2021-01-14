const Strategy = require('passport-local').Strategy;
const authorize = require('../bin/authorize/authorize');
const { serialize, deserialize } = require('../bin/authorize/serialization');

const initialize = (passport) => {
  const fields = {
    usernameField: 'username',
    passwordField: 'password'
  };
  passport.use(new Strategy(fields, authorize));
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
};

module.exports = initialize;
