/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AuthServices } from './auth.services';
import sendResponds from '../../utils/sendResponds';
// import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
// TODO: CatchAsync Add
const registerUserWithPass: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AuthServices.registerUserWithPass(req.body);
    sendResponds(res, {
      success: true,
      statusCode: 201,
      message: 'User registered succesfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const loginUserWithPass: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AuthServices.loginUserWithPass(req.body);
    sendResponds(res, {
      success: true,
      statusCode: 200,
      message: 'User login successful',
      data: result,
    });
  } catch (error) {
    // next(error);
    res.status(400).json({
      success: false,
      message: 'Unauthorized Access',
      errorMessage:
        'You do not have the necessary permissions to access this resource.',
      errorDetails: null,
      stack: null,
    });
  }
};
const changePasswordUserIntoDB: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.headers.authorization;

    const decoded = jwt.verify(
      accessToken as string,
      config.jwt_secret as string,
    );

    const result = await AuthServices.changePasswordUserIntoDB(
      req.body,
      decoded as JwtPayload,
    );
    sendResponds(res, {
      success: true,
      statusCode: 200,
      message: 'Password changed successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message:
        'Password change failed. Ensure the new password is unique and not among the last 2 used (last used on 2023-01-01 at 12:00 PM).',
      data: null,
    });
  }
};

export const AuthControllers = {
  registerUserWithPass,
  loginUserWithPass,
  changePasswordUserIntoDB,
};
