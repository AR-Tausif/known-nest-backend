import { RequestHandler } from 'express';
import { CategoryServices } from './category.services';

const createCategories: RequestHandler = async (req, res) => {
  try {
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

export const CategoriesControllers = {
  createCategories,
  getAllCategoriesController,
};
