const bcrypt = require('bcrypt');
const User = require('../models/user');

const uniqueUsername = async (name) => {
  try {
    let user = await User.findOne({ username: name });
    console.log(user);
    if (user) return false;
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createUser = async (name, pass) => {
  try {
    // generate salt and hash
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(pass, salt);

    // create user
    let newUser = new User({
      username: name,
      email: '',
      hash: hash,
      games: []
    });

    // store user
    await newUser.save();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const register = async (req, res, next) => {
  // redirect to home if logged in
  if (req.isAuthenticated())
    return res.status(401).send('You are already logged in.');
  
  const name = req.body.username;
  const pass = req.body.password;

  // username and password must not be empty
  if (!name || !pass)
    return res.status(401).send('Credentials must not be empty.');

  // username must be [2, 16] characters
  if (!(2 <= pass.length && pass.length <= 16))
    return res.status(401).send('Username must be 2 to 16 characters long.');

  // password must be [6, 30] characters
  if (!(6 <= pass.length && pass.length <= 30))
    return res.status(401).send('Password must be 6 to 30 characters long.');

  let isUnique = await uniqueUsername(name);
  if (!isUnique)
    return res.status(401).send('This username has been taken.');

  if (!createUser(name, pass))
    return res.status(401).send('Error: cannot register user.');

  return res.status(200).send('Success.');
};

module.exports = register;
