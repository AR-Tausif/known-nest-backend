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
    passwordHistory: [{ password: String, timestamp: Date }],
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

// createUserSchema.pre('save', async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;

//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(
//       user.password,
//       config.becrypt_salt_round as string,
//     );
//   }

//   next();
// });
export default User;
