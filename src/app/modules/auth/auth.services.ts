import { TUser } from '../user/user.interface';
import User from '../user/user.model';
import config from '../../config';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { comparePassword, hashedPassword } from './auth.utils';
const registerUserWithPass = async (payload: TUser) => {
  const myPlaintextPassword = payload.password;
  const passwordHash = await hashedPassword(
    myPlaintextPassword,
    config.becrypt_salt_round as string,
  );

  const { _id, username, email, password, role, createdAt, updatedAt } =
    await User.create({ ...payload, password: passwordHash });

  const resultData = {
    _id,
    username,
    email,
    role,
    createdAt,
    updatedAt,
  };
  return resultData;
};
const loginUserWithPass = async (payload: TUser) => {
  const myPlaintextPassword = payload.password;
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new Error('You entered wrong informations!');
  }
  const password = user.password;
  const isComparedPassword = await comparePassword(
    myPlaintextPassword,
    password,
  );
  if (!isComparedPassword) {
    throw new Error('You entered password is not valid!');
  }
  const userData = {
    _id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
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
  return { user: userData, accessToken };
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

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('User creadential is not valid. Try again later!');
  }

  const isComparedPassword = await comparePassword(
    payload.old_password,
    user.password,
  );
  const isComparedPasswordNew = await comparePassword(
    payload.new_password,
    user.password,
  );
  if (!isComparedPassword) {
    throw new Error('Password not matched. Try again later!');
  }
  if (isComparedPasswordNew) {
    throw new Error('Password matched previous one. Try with new password!');
  }

  const passwordHash = await hashedPassword(
    payload.new_password,
    config.becrypt_salt_round as string,
  );

  // Update password history
  user.passwordHistory.unshift({
    password: passwordHash,
    timestamp: new Date().toISOString(),
  });

  user.passwordHistory = user.passwordHistory.slice(0, 2); // Keep only the last 2 passwords

  // Save the updated user with the new password and password history
  user.password = passwordHash;

  return await user.save();
};

export const AuthServices = {
  registerUserWithPass,
  loginUserWithPass,
  changePasswordUserIntoDB,
};
