const logout = (req, res, next) => {
  // redirect to login if logged out
  if (!req.isAuthenticated())
    return res.status(200).send(process.env.SUCCESS);

  req.logOut();
  return res.status(200).send(process.env.SUCCESS);
};

module.exports = logout;
