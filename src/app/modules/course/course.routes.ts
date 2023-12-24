import { Router } from 'express';
import { CourseController } from './course.controllers';
import zodValidation from '../../middlewares/validations/zodValidations';
import { CourseZodValidationSchema } from './course.validation.zod';

const router = Router();

router.post(
  '/',
  zodValidation(CourseZodValidationSchema.createCourseSchema),
  CourseController.createCourse,
);
router.get('/best', CourseController.getBestCourseFromDB);

export const CourseRoute = router;
