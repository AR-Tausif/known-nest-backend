import { Query } from 'mongoose';

export const filterByDateRange = <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>,
) => {
  const queryObj: Record<string, unknown> = {};
  if (query.startDate !== undefined && query.endDate !== undefined) {
    queryObj.startDate = { $gte: new Date(query.startDate as string) };
    queryObj.endDate = { $lte: new Date(query.endDate as string) };

    modelQuery.find(queryObj);
  }

  return modelQuery; // Return all courses if startDate or endDate is not provided
};
