import { Router } from 'express';
import { ReviewControllers } from './review.controllers';
import zodValidation from '../../middlewares/validations/zodValidations';
import { ReviewZodValidationSchema } from './review.validation.zod';

const router = Router();
router.post(
  '/',
  zodValidation(ReviewZodValidationSchema.createReviewSchema),
  ReviewControllers.createReview,
);

export const ReviewRoutes = router;
