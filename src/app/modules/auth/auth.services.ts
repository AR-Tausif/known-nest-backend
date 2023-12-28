import config from '../../config';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
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

const changePasswordUserIntoDB = async (
  payload: {
    email: string;
    old_password: string;
    new_password: string;
  },
  decoded: JwtPayload,
) => {
  const { email } = decoded;
  const updateData = { password: payload.new_password };

  const isUserExist = await User.findOne({ email }).select('+password');

  if (!isUserExist) {
    throw new Error('User creadential is not valid. Try again later!');
  }

  if (!(isUserExist.password === payload.old_password)) {
    throw new Error('Password not matched. Try again later!');
  }
  const result = await User.findOneAndUpdate(
    { _id: isUserExist._id },
    updateData,
  );
  return result;
};

export const AuthServices = {
  registerUserWithPass,
  loginUserWithPass,
  changePasswordUserIntoDB,
};
