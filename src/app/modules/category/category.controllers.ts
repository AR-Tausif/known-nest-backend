import { RequestHandler } from 'express';
import { CategoryServices } from './category.services';
import jwt from 'jsonwebtoken';
import config from '../../config';
import sendResponds from '../../utils/sendResponds';
import httpStatus from 'http-status';
const createCategories: RequestHandler = async (req, res) => {
  try {
    const accessToken = req.headers.authorization;

    const decoded = jwt.verify(
      accessToken as string,
      config.jwt_secret as string,
    );
    req.body.createdBy = decoded._id;
    const result = await CategoryServices.createCategoriesService(req.body);

    res.status(200).json({
      success: true,
      message: 'Categories are created successfully',
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Some get issues on create categories',
      errorMessage: error,
    });
  }
};

const getAllCategoriesController: RequestHandler = async (req, res) => {
  try {
    const result = await CategoryServices.getAllCategoriesService();

    sendResponds(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'categories retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Some get issues on getting categories',
      errorMessage: error,
    });
  }
};

export const CategoriesControllers = {
  createCategories,
  getAllCategoriesController,
};
