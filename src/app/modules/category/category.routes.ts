import { Router } from 'express';
import { CategoriesControllers } from './category.controllers';
import zodValidation from '../../middlewares/validations/zodValidations';
import { CategoryZodValidationSchema } from './category.validation.zod';
import checkAuth from '../../middlewares/checkAuth';

const router = Router();
router.get('/', CategoriesControllers.getAllCategoriesController);
router.post(
  '/',
  zodValidation(CategoryZodValidationSchema.createCategorySchema),
  checkAuth('admin'),
  CategoriesControllers.createCategories,
);
export const CategoryRoutes = router;
