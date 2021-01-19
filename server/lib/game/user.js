const lobbiesSolo = async (req, res, next) => {
  if (!req.user) return res.status(403).send('User not logged in.');
  return res.status(200).send({ lobbies: req.user.lobbies });
};

const pastLobbiesSolo = async (req, res, next) => {
  if (!req.user) return res.status(403).send('User not logged in.');
  return res.status(200).send({ pastLobbies: req.user.pastLobbies });
};

module.exports = {
  lobbiesSolo: lobbiesSolo,
  pastLobbiesSolo: pastLobbiesSolo
};
