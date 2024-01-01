import { NextFunction, Request, Response } from 'express';
import CatchAsync from '../utils/catchAsync';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../modules/user/user.model';

const checkAuth = (...authRoles) =>
  CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    const decoded = jwt.verify(
      accessToken as string,
      config.jwt_secret as string,
    );
    const { email } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Unauthorized Access');
    }

    if (!authRoles.includes(user?.role)) {
      throw new Error(
        'You do not have the necessary permissions to access this resource.',
      );
    }
    next();
  });

export default checkAuth;
