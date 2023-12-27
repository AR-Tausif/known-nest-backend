import { RequestHandler } from 'express';
import sendResponds from '../../utils/sendResponds';
import { UserServices } from './user.service';
import httpStatus from 'http-status';

<<<<<<< HEAD
const createUserIntoDB: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserServices.createUserIntoDB(req.body);
=======
const createUserController: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserServices.createUserIntoDB();
>>>>>>> 433929fd89fdd7c7baf52bdf28600f48a6fcc071
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
<<<<<<< HEAD
const getUsersFromDB: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserServices.getUsersFromDB();
    sendResponds(res, {
      success: true,
      message: 'User retrieved succesfully!',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  getUsersFromDB,
  createUserIntoDB,
=======

export const UserController = {
  createUserController,
>>>>>>> 433929fd89fdd7c7baf52bdf28600f48a6fcc071
};
