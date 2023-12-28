import { NextFunction, Request, Response } from 'express';
import CatchAsync from '../utils/catchAsync';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../modules/user/user.model';

const checkAuth = (...authRoles: Array<'user' | 'admin'>) =>
  CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    console.log(accessToken);

    const decoded = jwt.verify(
      accessToken as string,
      config.jwt_secret as string,
    );
    const { email } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('You are not authorize user');
    }

    if (!authRoles.includes(user?.role)) {
      throw new Error('You are not authentic user');
    }
    next();
  });

export default checkAuth;
