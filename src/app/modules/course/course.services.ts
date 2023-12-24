import ReviewModel from '../review/review.model';
import { TCourse } from './course.interface';
import CourseModel from './course.model';

const createCourseService = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getBestCourseFromDBService = async () => {
  const result = await ReviewModel.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageRating: {
          $avg: '$rating',
        },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $project: {
        _id: 0,
        course: { $arrayElemAt: ['$course', 0] },
        averageRating: { $round: ['$averageRating', 2] },
        reviewCount: '$reviewCount',
      },
    },
  ]);
  return result;
};

export const CourseServices = {
  createCourseService,
  getBestCourseFromDBService,
};
