import { RequestHandler } from 'express';
import { ReviewServices } from './review.services';

const createReview: RequestHandler = async (req, res) => {
  try {
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
