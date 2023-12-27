import { RequestHandler } from 'express';
import sendResponds from '../../utils/sendResponds';
import { UserServices } from './user.service';
import httpStatus from 'http-status';

const createUserController: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserServices.createUserIntoDB();
    sendResponds(res, {
      success: true,
      message: 'User created succesfully!',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUserController,
};
