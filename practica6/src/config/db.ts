import mongoose from "mongoose";
import 'dotenv/config';

export const connectDB = async () => {
  try {
    const url = process.env.DATABASE_URL!;
    const connection = await mongoose.connect(url);
    console.log('MongoDB conectado');
  } catch (error) {
    console.log('Error al conectar con MongoDB:', error.message);
  }
};
