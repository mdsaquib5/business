import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({
    customer: {
        name: String,
        email: String,
        phone: String,
        address: String
    },
    products: [{
        productId: String,
        name: String,
        quantity: Number,
        price: Number
    }],
    totalPrice: Number,
    totalQuantity: Number
}, { timestamps: true });


export default mongoose.model('Order', orderSchema);