import User from 'models/user';

async function uniqueUsername(name: string) {
  try {
    let user = await User.findOne({ username: name }).exec();
    if (user) return false;
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export default uniqueUsername;
