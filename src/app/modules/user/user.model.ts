import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';

const createUserSchema = new Schema<TUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
<<<<<<< HEAD
    select: 0,
=======
>>>>>>> 433929fd89fdd7c7baf52bdf28600f48a6fcc071
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

<<<<<<< HEAD
const User = mongoose.model('Participate', createUserSchema);
=======
const User = mongoose.model('User', createUserSchema);
>>>>>>> 433929fd89fdd7c7baf52bdf28600f48a6fcc071
export default User;
