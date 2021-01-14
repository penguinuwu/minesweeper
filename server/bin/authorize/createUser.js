const bcrypt = require('bcrypt');
const User = require('$/models/user');

const createUser = async (name, pass) => {
  try {
    // generate salt and hash
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(pass, salt);

    // create user
    let newUser = new User({
      username: name,
      hash: hash
    });

    // store user
    await newUser.save();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = createUser;
