import { TCategory } from './category.interface';
import CategoryModel from './category.model';

const createCategoriesService = async (payload: TCategory) => {
  return await CategoryModel.create(payload);
};
const getAllCategoriesService = async () => {
  return await CategoryModel.find({});
};

export const CategoryServices = {
  createCategoriesService,
  getAllCategoriesService,
};
