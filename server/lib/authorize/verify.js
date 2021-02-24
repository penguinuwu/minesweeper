const verify = (req, res) => {
  // redirect to home if logged in
  if (req.isAuthenticated()) return res.status(200).send(req.user.username);
  return res.status(403).send('You are not logged in.');
};

module.exports = verify;
