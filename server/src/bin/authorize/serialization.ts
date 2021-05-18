const User = require('$/models/user');

const serialize = (user, done) => done(null, user.id);

const deserialize = (id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log(err);
      return done(err);
    }
    if (!user) return done(null, false);
    return done(null, user);
  });
};

module.exports = {
  serialize: serialize,
  deserialize: deserialize
};
