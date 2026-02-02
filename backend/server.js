import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import { connectDB } from './config/db.js';

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// For Vercel serverless
export default async (req, res) => {
    try {
        await connectDB();
        app(req, res);
    } catch (error) {
        console.error('Function invocation error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// For local development
if (process.env.NODE_ENV !== 'production') {
    connectDB();
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}