import { RequestHandler } from 'express';
import { CourseServices } from './course.services';
import sendResponds from '../../utils/sendResponds';
import httpStatus from 'http-status';
import getDurationInWeeks from '../../constants/getDurationInWeek';
import jwt from 'jsonwebtoken';
import config from '../../config';
const createCourse: RequestHandler = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;
    const isoStartDate = new Date(`${startDate}T00:00:00.000Z`);
    const isoEndDate = new Date(`${endDate}T23:59:59.999Z`);
    const accessToken = req.headers.authorization;

    const decoded = jwt.verify(
      accessToken as string,
      config.jwt_secret as string,
    );
    const durationInWeeks = getDurationInWeeks(startDate, endDate);
    req.body.durationInWeeks = durationInWeeks;
    req.body.startDate = isoStartDate;
    req.body.endDate = isoEndDate;
    req.body.createdBy = decoded._id as string;
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
