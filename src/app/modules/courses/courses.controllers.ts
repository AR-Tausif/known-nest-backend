import { RequestHandler } from 'express';
import { CoursesServices } from './courses.services';
import sendResponds from '../../utils/sendResponds';
import httpStatus from 'http-status';
import CourseModel from '../course/course.model';
import getDurationInWeeks from '../../constants/getDurationInWeek';

const getAllCourse: RequestHandler = async (req, res, next) => {
  try {
    const query = req.query;
    const data = await CoursesServices.getAllCourseService(query);
    const total = await CourseModel.countDocuments();

    const meta = {
      page: query.page,
      limit: query.limit,
      total,
    };

    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courses are retrived succesfully.',
      meta,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getCourseReviewsById: RequestHandler = async (req, res, next) => {
  const courseId = req.params.courseId;

  try {
    const data = await CoursesServices.getCourseReviewsByIdService(courseId);

    sendResponds(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courses reviews are retrived succesfully.',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateCourseDataIntoDB: RequestHandler = async (req, res, next) => {
  const courseId = req.params.courseId;

  const { startDate, endDate } = req.body.course;
  if (startDate && endDate) {
    const durationInWeeks = getDurationInWeeks(startDate, endDate);
    req.body.course['durationInWeeks'] = durationInWeeks;
  }
  const updatedCourseData = req.body.course;
  try {
    const data = await CoursesServices.updateCourseDataIntoDBService(
      courseId,
      updatedCourseData,
    );
    sendResponds(res, {
      success: true,
      statusCode: 201,
      message: 'Course Updated Succesfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const CoursesControllers = {
  getAllCourse,
  getCourseReviewsById,
  updateCourseDataIntoDB,
};
