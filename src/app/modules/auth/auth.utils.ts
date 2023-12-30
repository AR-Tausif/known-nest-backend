import bcrypt from 'bcrypt';

export const hashedPassword = async (
  myPlaintextPassword: string,
  saltRound: string,
) => {
  const passwordHash = await bcrypt.hash(
    myPlaintextPassword,
    Number(saltRound),
  );
  return passwordHash;
};

export const comparePassword = async (
  myPlaintextPassword: string,
  hashPassword: string,
) => {
  const isComparedPassword = await bcrypt.compare(
    myPlaintextPassword,
    hashPassword,
  );

  return isComparedPassword;
};
