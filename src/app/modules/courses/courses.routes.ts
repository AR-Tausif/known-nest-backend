import { NextFunction, Request, Response, Router } from 'express';
import { CoursesControllers } from './courses.controllers';
import zodValidation from '../../middlewares/validations/zodValidations';
import { CourseZodValidationSchema } from '../course/course.validation.zod';
import User from '../user/user.model';
import { TUser } from '../user/user.interface';

const router = Router();
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      const user = await User.findOne(body);
      if (!user) {
        throw new Error('You are not authorize user');
      }

      if (!(user?.role === 'admin')) {
        throw new Error('You are not authentic user');
      }
      console.log(user);

      next();
    } catch (error) {
      next(error);
    }
  },
  CoursesControllers.getAllCourse,
);
router.put(
  '/:courseId',
  zodValidation(CourseZodValidationSchema.updateCourseSchema),
  CoursesControllers.updateCourseDataIntoDB,
);
router.get('/:courseId/reviews', CoursesControllers.getCourseReviewsById);
export const CoursesRoutes = router;
