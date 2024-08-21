import mongoose from 'mongoose';
import 'dotenv/config';


const connectionString = process.env.MONGO_URL || 'mongodb://localhost:8080/tienda';


export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log('Successfully connected to mongoDB database');
    } catch (error) {
        console.log(`ERROR ${error}`);
    }
}