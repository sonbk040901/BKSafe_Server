import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bksafe";
const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY || "bksafe_app_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || "10";
const GOOGLE_MAP_API_KEY =
  process.env.GOOGLE_MAP_API_KEY || "AIzaSyAEn8nMmB25gsoZZ1FDk8kjeoybqILvc0k";
export {
  PORT,
  MONGO_URI,
  AUTH_SECRET_KEY,
  JWT_EXPIRES_IN,
  BCRYPT_SALT_ROUNDS,
  GOOGLE_MAP_API_KEY,
};
