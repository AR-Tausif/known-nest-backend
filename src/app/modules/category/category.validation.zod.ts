import { z } from 'zod';

const createCategorySchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export const CategoryZodValidationSchema = {
  createCategorySchema,
};
