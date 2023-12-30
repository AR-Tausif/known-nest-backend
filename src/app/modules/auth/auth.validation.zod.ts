import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
});

const changePasswordUserValidationSchema = z.object({
  body: z.object({
    old_password: z.string(),
    new_password: z.string(),
  }),
});
export const AuthValidationSchema = {
  registerUserValidationSchema,
  loginUserValidationSchema,
  changePasswordUserValidationSchema,
};
