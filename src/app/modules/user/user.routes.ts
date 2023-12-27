<<<<<<< HEAD
import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();
router.post('/create-user', UserController.createUserIntoDB);
router.get('/', UserController.getUsersFromDB);
=======
import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
router.post('create-user', UserController.createUserController);
>>>>>>> 433929fd89fdd7c7baf52bdf28600f48a6fcc071

export const UserRouter = router;
