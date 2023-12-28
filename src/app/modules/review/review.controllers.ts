import { RequestHandler } from 'express';
import { ReviewServices } from './review.services';
import jwt from 'jsonwebtoken';
import config from '../../config';
const createReview: RequestHandler = async (req, res) => {
  try {
    const accessToken = req.headers.authorization;

    const decoded = jwt.verify(
      accessToken as string,
      config.jwt_secret as string,
    );
    req.body.createdBy = decoded._id;
    const data = await ReviewServices.createReviewService(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Review is created successfully',
      data,
    });
  } catch (error) {
    res.status(204).json({
      success: false,
      statusCode: 204,
      message: 'Review create issues',
      error: error,
    });
  }
};
export const ReviewControllers = {
  createReview,
};
