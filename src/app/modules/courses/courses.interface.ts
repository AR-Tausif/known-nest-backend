import { Types } from 'mongoose';

export interface UpdateTag {
  name?: string;
  isDeleted?: boolean;
}

export interface UpdateCourseDetails {
  level?: string;
  description?: string;
}

export interface TUpdateCourse {
  _id?: string;
  title?: string;
  instructor?: string;
  categoryId?: Types.ObjectId;
  price?: number;
  tags?: UpdateTag[];
  startDate?: string;
  endDate?: string;
  language?: string;
  provider?: string;
  durationInWeeks?: number;
  details?: UpdateCourseDetails;
}

export type TQueryObj = {
  [key: string]: unknown;
  page: string;
  searchTerm: string;
  limit: string;
  sortBy: string;
  sortOrder: string;
  fields: string;
};
