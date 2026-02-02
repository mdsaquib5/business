import Order from '../models/Order.js';


export const placeOrder = async (req, res) => {
    const order = await Order.create(req.body);
    res.status(201).json(order);
};