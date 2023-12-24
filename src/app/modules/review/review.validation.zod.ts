import { z } from 'zod';

const createReviewSchema = z.object({
  body: z.object({
    courseId: z.string(),
    rating: z.number(),
    review: z.string(),
  }),
});

export const ReviewZodValidationSchema = { createReviewSchema };
