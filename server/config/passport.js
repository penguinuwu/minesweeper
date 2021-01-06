const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

const authorize = (name, pass, done) => {
  const failMsg = { message: 'Incorrect credentials.' };

  // username and password must not be empty
  if (!name || !pass)
    return done(null, false, failMsg);

  // find username in database
  User.findOne({ username: name }, (err, user) => {
    if (err) {
      console.log(err);
      return done(err);
    }

    // check if username not found
    if (!user)
      return done(null, false, failMsg);

    // compare hashed password
    bcrypt.compare(pass, user.hash)
      .then((res) => {
        // credentials invalid
        if (!res)
          return done(null, false, failMsg);

        // credentials valid
        return done(null, user);
      });
  });
};

const serialize = (user, done) => done(null, user.id);

const deserialize = (id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log(err);
      return done(err);
    }

    if (!user)
      return done(null, false);

    return done(null, user)
  });
}

const initialize = (passport) => {
  const fields = {
    usernameField: 'username',
    passwordField: 'password'
  };
  passport.use(new Strategy(fields, authorize));
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
}

// modules.exports = initialize;
initialize(passport);
