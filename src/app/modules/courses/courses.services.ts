import { filter } from '../../queryHelper/filterHelper';
import { sortHelper } from '../../queryHelper/sortHelper';

import CourseModel from '../course/course.model';
import ReviewModel from '../review/review.model';

import { TQueryObj, TUpdateCourse } from './courses.interface';

const getAllCourseService = async (query: TQueryObj) => {
  const filteredQuery = filter(CourseModel.find(), query);
  const sortedQuery = sortHelper(filteredQuery, query);

  if (query.tags) {
    const tagQuery = { tags: { $elemMatch: { name: query.tags } } };
    sortedQuery.find(tagQuery);
  }

  if (query.startDate && query.endDate) {
    const startDate = query.startDate;
    const endDate = query.startDate;

    // Add 'T00:00:00.000Z' to represent the start of the day for both dates
    // const isoStartDate = new Date(`${startDate}T00:00:00.000Z`);
    // const isoEndDate = new Date(`${endDate}T23:59:59.999Z`);

    sortedQuery.find({
      startDate: { $gte: startDate },
      endDate: { $lte: endDate },
    });
  }

  if (query.level) {
    const level = query.level;
    sortedQuery.find({ 'details.level': level });
  }
  if (query.minPrice && query.maxPrice) {
    const minPrice = parseFloat(query.minPrice as string);
    const maxPrice = parseFloat(query.maxPrice as string);
    const priceQuery = {
      price: { $gte: minPrice, $lte: maxPrice },
    };

    sortedQuery.find(priceQuery);
  }

  const result = await sortedQuery;
  return result;
};
// const getAllCourseService = async (query: Record<string, unknown>) => {
//   const searchQuery = { ...query };
//   let searchTerm = '';

//   // Updated fieldsSearch to include startDate and endDate
//   const fieldsSearch = ['instructor', 'startDate', 'endDate'];

//   if (query.searchTerm) {
//     searchTerm = query.searchTerm as string;
//   }

//   // Partial searching here with dynamically
//   const searchGetQuery = CourseModel.find({
//     $or: fieldsSearch.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   });

//   // Exclude search queries that I did not include when finding
//   const excludSearchQuery = ['searchTerm', 'sortBy', 'page', 'limit'];
//   excludSearchQuery.forEach((el) => delete searchQuery[el]);

//   // Handling date range filter
//   if (query.startDate && query.endDate) {
//     searchQuery.startDate = {
//       $gte: new Date(query.startDate as string),
//     };
//     searchQuery.endDate = {
//       $lte: new Date(query.endDate as string),
//     };
//   }
//   if (query.minPrice && query.maxPrice) {
//     searchQuery.price = {
//       $gte: parseFloat(query.minPrice as string),
//       $lte: parseFloat(query.maxPrice as string),
//     };
//   }
//   if (query.durationInWeeks) {
//     searchQuery.durationInWeeks = Number(query.durationInWeeks);
//   }

//   const filteredQuery = searchGetQuery
//     .find(searchQuery)
//     .populate({ path: 'categoryId' });

//   let sortBy = '-createdAt';
//   if (query.sortBy) {
//     sortBy = query.sortBy as string;
//   }
//   const sortedQuery = filteredQuery.sort(sortBy);

//   let limit = 1;
//   if (query.limit) {
//     limit = Number(query.limit);
//   }
//   let page = 1;
//   let skip = 0;
//   if (query.page) {
//     page = Number(query.page);
//     skip = (page - 1) * limit;
//   }
//   const paginateQuery = sortedQuery.skip(skip);
//   const limitQuery = await paginateQuery.limit(limit).populate('createdBy');

//   return limitQuery;
// };

const getCourseReviewsByIdService = async (courseId: string) => {
  const reviewData = await ReviewModel.find({ courseId });

  const courseData = await CourseModel.findById({ _id: courseId }).populate({
    path: 'categoryId',
  });

  if (!courseData) {
    throw new Error(`${courseId} with course NOT Found`);
  }

  return {
    course: courseData,
    reviews: reviewData,
  };
};

const updateCourseDataIntoDBService = async (
  id: string,
  updateData: TUpdateCourse,
) => {
  const isExist = await CourseModel.findById(id);
  if (!isExist) {
    throw new Error('Invalid Id');
  }

  const { tags, details, ...remainingCourseData } = updateData;
  const modifiedCourseData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedCourseData[`details.${key}`] = value;
    }
  }

  // Perform the $set operation first

  const setOperationResult = await CourseModel.findOneAndUpdate(
    { _id: id },
    {
      $set: modifiedCourseData,
    },
    { new: true },
  );

  // Perform the $pull operation next
  if (tags) {
    const pullOperationResult = await CourseModel.findOneAndUpdate(
      { _id: id },
      {
        tags: {
          $pull: {
            name: {
              $in: tags
                .filter((tag) => tag.isDeleted === true)
                .map((tag) => tag.name),
            },
          },
        },
      },
      { new: true },
    );

    const addToSetOperationResult = await CourseModel.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: {
          tags: { $each: tags.filter((tag) => tag.isDeleted === false) },
        },
      },
      { new: true },
    );
    return addToSetOperationResult;
  }
  return setOperationResult;
};
export const CoursesServices = {
  getAllCourseService,
  getCourseReviewsByIdService,
  updateCourseDataIntoDBService,
};
