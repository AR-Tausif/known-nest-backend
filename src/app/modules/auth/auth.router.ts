import { Router } from 'express';
import { AuthControllers } from './auth.controller';

const router = Router();
router.post('/register', AuthControllers.registerUserWithPass);
router.post('/login', AuthControllers.loginUserWithPass);
router.post('/change-password', AuthControllers.changePasswordUserIntoDB);

export const AuthRouter = router;
