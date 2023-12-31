import { Router } from 'express';
import { CoursesControllers } from './courses.controllers';
import zodValidation from '../../middlewares/validations/zodValidations';
import { CourseZodValidationSchema } from '../course/course.validation.zod';
import checkAuth from '../../middlewares/checkAuth';

const router = Router();
router.get('/', CoursesControllers.getAllCourse);
router.put(
  '/:courseId',
  zodValidation(CourseZodValidationSchema.updateCourseSchema),
  checkAuth('admin'),
  CoursesControllers.updateCourseDataIntoDB,
);
router.get('/:courseId/reviews', CoursesControllers.getCourseReviewsById);
export const CoursesRoutes = router;
