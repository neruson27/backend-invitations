import dotenv from 'dotenv';
dotenv.config();

const config = {
  mongoUrl: process.env.MONGO_DB_URL || 'mongodb+srv://localhost:27017/wedding_invitation',
  secret: process.env.SECRET || ''
}

export default config;