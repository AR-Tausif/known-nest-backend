import { Router } from 'express';
import { CategoriesControllers } from './category.controllers';
import zodValidation from '../../middlewares/validations/zodValidations';
import { CategoryZodValidationSchema } from './category.validation.zod';

const router = Router();
router.get('/', CategoriesControllers.getAllCategoriesController);
router.post(
  '/',
  zodValidation(CategoryZodValidationSchema.createCategorySchema),
  CategoriesControllers.createCategories,
);
export const CategoryRoutes = router;
