import { Router } from 'express';
import { ReviewControllers } from './review.controllers';
import zodValidation from '../../middlewares/validations/zodValidations';
import { ReviewZodValidationSchema } from './review.validation.zod';
import checkAuth from '../../middlewares/checkAuth';

const router = Router();
router.post(
  '/',
  zodValidation(ReviewZodValidationSchema.createReviewSchema),
  checkAuth('user'),
  ReviewControllers.createReview,
);

export const ReviewRoutes = router;
