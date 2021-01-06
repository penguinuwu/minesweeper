const passport = require('passport');

const login = (req, res, next) => {
  // redirect to home if logged in
  if (req.isAuthenticated())
    return res.redirect('/home');
  
  return passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
  })(req, res, next);
};

const logout = (req, res, next) => {
  // redirect to login if logged out
  if (!req.isAuthenticated())
    return res.redirect('/login');
    
  req.logout();
  return res.redirect('/home');
};

module.exports = {
  login: login,
  logout: logout
};
