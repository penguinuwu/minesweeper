const logout = (req, res, next) => {
  // redirect to login if logged out
  if (!req.isAuthenticated())
    return res.status(403).send('You are not logged in.');

  req.logOut();
  return res.status(200).send('Success.');
};

module.exports = logout;
