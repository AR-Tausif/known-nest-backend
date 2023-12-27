import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();
router.post('/create-user', UserController.createUserIntoDB);
router.get('/', UserController.getUsersFromDB);

export const UserRouter = router;
