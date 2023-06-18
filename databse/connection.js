import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connection = async () => {
    const connectionUrl = process.env.dbConnectionUrl

    try {
        await mongoose.connect( connectionUrl );
        console.log('database connected')
    } catch (err) {
        console.log(err.message);
    }
}