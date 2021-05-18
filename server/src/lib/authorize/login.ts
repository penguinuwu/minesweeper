const passport = require('passport');

const login = (req, res, next) => {
  // redirect to home if logged in
  if (req.isAuthenticated())
    return res.status(200).send({ username: req.user.username });

  return passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).send('Incorrect credentials.');

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).send({ username: user.username });
    });
  })(req, res, next);
};

module.exports = login;
