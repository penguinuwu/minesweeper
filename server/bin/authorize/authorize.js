const bcrypt = require('bcrypt');
const User = require('../../models/user');

const authorize = (name, pass, done) => {
  const failMsg = { message: 'Incorrect credentials.' };

  // username and password must not be empty
  if (!name || !pass) return done(null, false, failMsg);

  // find username in database
  User.findOne({ username: name }, (err, user) => {
    if (err) {
      console.log(err);
      return done(err);
    }

    // check if username not found
    if (!user) return done(null, false, failMsg);

    // compare hashed password
    bcrypt.compare(pass, user.hash).then((res) => {
      // credentials invalid
      if (!res) return done(null, false, failMsg);

      // credentials valid
      return done(null, user);
    });
  });
};

module.exports = authorize;
