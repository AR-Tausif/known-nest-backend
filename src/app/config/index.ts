import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT,
  database_url: process.env.DATABASEURL,
  local_database_url: process.env.LOCAL_DATABASEURL,
  default_password: process.env.DEFAULT_PASS,
  becrypt_salt_round: process.env.BECRYPT_SALT_ROUND,
};
