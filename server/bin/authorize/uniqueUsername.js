const User = require('$/models/user');

const uniqueUsername = async (name) => {
  try {
    let user = await User.findOne({ username: name }).exec();
    if (user) return false;
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = uniqueUsername;
