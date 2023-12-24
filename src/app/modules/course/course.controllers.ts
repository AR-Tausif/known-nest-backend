import { RequestHandler } from 'express';
import { CourseServices } from './course.services';
import sendResponds from '../../utils/sendResponds';
import httpStatus from 'http-status';
import getDurationInWeeks from '../../constants/getDurationInWeek';

const createCourse: RequestHandler = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;
    const durationInWeeks = getDurationInWeeks(startDate, endDate);
    req.body.durationInWeeks = durationInWeeks;
    const result = await CourseServices.createCourseService(req.body);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: 'Course is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getBestCourseFromDB: RequestHandler = async (req, res, next) => {
  try {
    const data = await CourseServices.getBestCourseFromDBService();
    sendResponds(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'reviews get succesfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const CourseController = {
  createCourse,
  getBestCourseFromDB,
};
