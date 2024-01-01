import { Query } from 'mongoose';
import { TQueryObj } from '../modules/courses/courses.interface';
// import { TQueryObj } from '../types/TQueryObj'

export const filter = <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>,
) => {
  const queryObj = { ...query };
  //exact match
  const excludedFields = [
    'page',
    'searchTerm',
    'limit',
    'sortBy',
    'sortOrder',
    'fields',
    'startDate',
    'endDate',
    'tags',
    'minPrice',
    'maxPrice',
    'level',
  ];
  excludedFields.forEach((keyword) => delete queryObj[keyword]);

  modelQuery = modelQuery.find(queryObj as TQueryObj);
  return modelQuery;
};

// import { Query, Document } from 'mongoose';
// import { TQueryObj } from '../modules/courses/courses.interface';

// export const filter = <T extends Document>(modelQuery: Query<T[], T>, query: TQueryObj) => {
//   const queryObj: Record<string, any> = { ...query };

//   // Exact match
//   const excludedFields = [
//     'page',
//     'searchTerm',
//     'limit',
//     'sortBy',
//     'sortOrder',
//     'fields',
//   ];
//   excludedFields.forEach((keyword) => delete queryObj[keyword]);

//   // Handle specific fields that need special processing (e.g., date range, tags array)
//   if (query.startDate && query.endDate) {
//     queryObj.startDate = { $gte: new Date(query.startDate) };
//     queryObj.endDate = { $lte: new Date(query.endDate) };
//     delete queryObj.startDate;
//     delete queryObj.endDate;
//   }

//   if (query.tags) {
//     queryObj['tags.name'] = { $in: Array.isArray(query.tags) ? query.tags : [query.tags] };
//     delete queryObj.tags;
//   }

//   // Apply filters to the modelQuery based on the updated queryObj
//   modelQuery = modelQuery.find(queryObj);

//   // Return the updated modelQuery
//   return modelQuery;
// };

// page=&limit=0&sortBy=startDate'&sortOrder=asc'&minPrice=0.00&maxPrice=0.00&tags=Programming'&startDate=2023-01-01'&endDate=2023-12-31'&language=English'&provider=Tech Academy'&durationInWeeks=&level=Intermediat
