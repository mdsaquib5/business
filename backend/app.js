import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);


export default app;