import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import { connectDB } from './config/db.js';


connectDB();


app.listen(4000, () => console.log('Server running on 4000'));