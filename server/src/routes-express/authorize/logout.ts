import { Request, Response } from 'express';

function logout(req: Request, res: Response) {
  // redirect to login if logged out
  if (!req.isAuthenticated()) return res.status(200).send(process.env.SUCCESS);

  req.logOut();
  return res.status(200).send(process.env.SUCCESS);
}

export default logout;
