import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';

const createUserSchema = new Schema<TUser>(
  {
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
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);
//TODO: Need to update user collection name on 'Participate' name__
const User = mongoose.model('Participate', createUserSchema);
export default User;
