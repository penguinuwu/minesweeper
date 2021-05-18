const lobbies = async (req, res, next) => {
  if (!req.user) return res.status(403).send('User not logged in.');
  return res.status(200).send({ lobbies: req.user.lobbies });
};

const pastLobbies = async (req, res, next) => {
  if (!req.user) return res.status(403).send('User not logged in.');
  return res.status(200).send({ lobbies: req.user.pastLobbies });
};

module.exports = {
  lobbies: lobbies,
  pastLobbies: pastLobbies
};
