import { Router } from 'express';
import { CourseRoute } from '../modules/course/course.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { CoursesRoutes } from '../modules/courses/courses.routes';
import { UserRouter } from '../modules/user/user.routes';
import { AuthRouter } from '../modules/auth/auth.router';

const router = Router();

const modulePatternRoutes = [
  {
    path: '/course',
    route: CourseRoute,
  },
  {
    path: '/courses',
    route: CoursesRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
];

modulePatternRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
