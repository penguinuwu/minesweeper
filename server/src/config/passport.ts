import bcrypt from 'bcrypt';
import { PassportStatic } from 'passport';
import passportLocal from 'passport-local';

import UserModel, { UserClass } from 'models/user';

// allow Express.User to extend UserClass
// https://stackoverflow.com/a/60981927/9069307
declare global {
  namespace Express {
    interface User extends UserClass {}
  }
}

function passportConfig(passport: PassportStatic) {
  // use strategy
  const fields = {
    usernameField: 'username',
    passwordField: 'password'
  };
  passport.use(
    new passportLocal.Strategy(fields, (name, pass, done) => {
      const failMsg = { message: 'Incorrect credentials.' };

      // username and password must not be empty
      if (!name || !pass) return done(null, false, failMsg);

      // find username in database
      UserModel.findOne({ username: name }, (err: any, user: UserClass) => {
        if (err) {
          console.log(err);
          return done(err);
        }

        // check if username not found
        if (!user) return done(null, false, failMsg);

        // compare hashed password
        bcrypt.compare(pass, user.hash).then((res) => {
          // credentials invalid
          if (!res) return done(null, false, failMsg);

          // credentials valid
          return done(null, user);
        });
      });
    })
  );

  // serialize
  passport.serializeUser((user: UserClass, done) => done(null, user.id));

  // deserialize
  passport.deserializeUser((id, done) =>
    UserModel.findById(id, (err: any, user: UserClass) => {
      if (err) {
        console.log(err);
        return done(err);
      }
      if (!user) return done(null, false);
      return done(null, user);
    })
  );
}

export default passportConfig;
