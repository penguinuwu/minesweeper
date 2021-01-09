const passport = require('passport');

const login = (req, res, next) => {
  // redirect to home if logged in
  if (req.isAuthenticated())
    return res.status(403).send('You are already logged in.');

  return passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user)
      return res.status(401).send('Incorrect credentials.');
  
    req.logIn(user, (err) => {
      if (err)
        return next(err);
      return res.status(200).send('Success.');
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  // redirect to login if logged out
  if (!req.isAuthenticated())
    return res.status(403).send('You are not logged in.');
    
  req.logOut();
  return res.status(200).send('Success.');
};

module.exports = {
  login: login,
  logout: logout
};
