import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import zodValidation from '../../middlewares/validations/zodValidations';
import { AuthValidationSchema } from './auth.validation.zod';
import checkAuth from '../../middlewares/checkAuth';

const router = Router();
router.post(
  '/register',
  zodValidation(AuthValidationSchema.registerUserValidationSchema),
  AuthControllers.registerUserWithPass,
);
router.post(
  '/login',
  zodValidation(AuthValidationSchema.loginUserValidationSchema),
  AuthControllers.loginUserWithPass,
);
router.post(
  '/change-password',
  checkAuth('admin', 'user'),
  AuthControllers.changePasswordUserIntoDB,
);

export const AuthRouter = router;
