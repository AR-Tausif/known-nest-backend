import config from '../../config';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';
import jwt from 'jsonwebtoken';
const registerUserWithPass = async (payload: TUser) => {
  console.log(payload);
  const result = await User.create(payload);
  return result;
};
const loginUserWithPass = async (payload: TUser) => {
  const user = await User.findOne(payload);
  if (!user) {
    throw new Error('You entered wrong informations!');
  }
  console.log(user);
  const accessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    config.jwt_secret as string,
    {
      expiresIn: config.jwt_expires_in,
    },
  );
  return { user, accessToken };
};

const changePasswordUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const isUserExist = User.findOne({ payload });
  if (isUserExist) {
    throw new Error('User creadential is not valid. Try again later!');
  }
  const result = await User.findOneAndUpdate({ payload });
  return result;
};

export const AuthServices = {
  registerUserWithPass,
  loginUserWithPass,
  changePasswordUserIntoDB,
};
