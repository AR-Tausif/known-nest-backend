import { Router } from 'express';
import { CourseController } from './course.controllers';
import zodValidation from '../../middlewares/validations/zodValidations';
import { CourseZodValidationSchema } from './course.validation.zod';
import checkAuth from '../../middlewares/checkAuth';

const router = Router();

router.post(
  '/',
  zodValidation(CourseZodValidationSchema.createCourseSchema),
  checkAuth('admin'),
  CourseController.createCourse,
);
router.get('/best', CourseController.getBestCourseFromDB);

export const CourseRoute = router;
