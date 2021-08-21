import bcrypt from 'bcryptjs';
import UserModel from 'models/user';

async function createUser(name: string, pass: string) {
  try {
    // generate salt and hash
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(pass, salt);

    // create user
    let newUser = new UserModel({
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
}

export default createUser;
