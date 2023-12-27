<<<<<<< HEAD
import { TUser } from './user.interface';
import User from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
const getUsersFromDB = async () => {
  const result = await User.find({});
  return result;
};

export const UserServices = {
  getUsersFromDB,
  createUserIntoDB,
};
=======
const createUserIntoDB = ()=>{
    const 
}

export const UserServices={
    createUserIntoDB
}
>>>>>>> 433929fd89fdd7c7baf52bdf28600f48a6fcc071
