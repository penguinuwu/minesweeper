import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

function login(req: Request, res: Response, next: NextFunction) {
  // redirect to home if logged in
  if (req.isAuthenticated())
    return res.status(200).send({ username: req.user.username });

  return passport.authenticate('local', (err, user, _info) => {
    if (err) return next(err);
    if (!user) return res.status(401).send('Incorrect credentials.');

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).send({ username: user.username });
    });
  })(req, res, next);
}

export default login;
