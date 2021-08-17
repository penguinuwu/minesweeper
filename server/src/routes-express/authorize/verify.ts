import { Request, Response } from 'express';

function verify(req: Request, res: Response) {
  // redirect to home if logged in
  if (req.isAuthenticated())
    return res.status(200).send({ username: req.user.username });
  return res.status(403).send('You are not logged in.');
}

export default verify;
