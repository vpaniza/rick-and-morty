import mongoose from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config();

let connectionInitialized = false;

export const initializeConnection = async () => {
  if (!connectionInitialized) {
    try {
      const dbUrl = `${"mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PWD+"@"+process.env.MONGO_DB+"?retryWrites=true&w=majority"}`;
      if (dbUrl) {
        await mongoose.connect(dbUrl);
        console.log('Connected with database');
        connectionInitialized = true;
      } else {
        console.log('DB_URL not found in environment variables');
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
  }
};

export const createConnection = async (): Promise<void> => {
  await initializeConnection();
};