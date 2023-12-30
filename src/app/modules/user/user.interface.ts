export type TUser = {
  username: string;
  email: string;
  password: string;
  passwordHistory: Array<{ password: string; timestamp: Date }>;
  role: 'user' | 'admin';
};
