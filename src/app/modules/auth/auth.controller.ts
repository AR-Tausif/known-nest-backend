import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AuthServices } from './auth.services';
import sendResponds from '../../utils/sendResponds';
import httpStatus from 'http-status';

const registerUserWithPass: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AuthServices.registerUserWithPass(req.body);
    sendResponds(res, {
      success: true,
      statusCode: httpStatus.OK,
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
      statusCode: httpStatus.OK,
      message: 'User logged in succesfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const changePasswordUserIntoDB: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AuthServices.changePasswordUserIntoDB(req.body);
    sendResponds(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Password changed successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthControllers = {
  registerUserWithPass,
  loginUserWithPass,
  changePasswordUserIntoDB,
};
