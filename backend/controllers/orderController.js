import Order from "../models/orderModel.js";
import mongoose from "mongoose";

export const placeOrder = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      address,
      products
    } = req.body;

    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Cart is empty" });
    }

    // Convert productId strings to ObjectId with validation
    const processedProducts = products.map(product => {
      if (!mongoose.Types.ObjectId.isValid(product.productId)) {
        throw new Error(`Invalid productId format: ${product.productId}. ProductId must be a 24-character hex string.`);
      }
      return {
        ...product,
        productId: new mongoose.Types.ObjectId(product.productId)
      };
    });

    const order = await Order.create({
      customerName,
      email,
      phone,
      address,
      products: processedProducts
    });

    // Generate WhatsApp redirect URL with order details
    const totalAmount = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const productList = products.map(p => 
      `${p.name} - Qty: ${p.quantity} - ₹${p.price * p.quantity}`
    ).join('\n');
    
    const whatsappMessage = `Please confirm to proceed your order.\n\nOrderID: ${order._id}\nAddress: ${address}\n${productList}\n\nTotal Price: ₹${totalAmount}\n---------------`;
    const whatsappUrl = `https://wa.me/918700546207?text=${encodeURIComponent(whatsappMessage)}`;

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
      orderDetails: {
        customerName,
        email,
        phone,
        address,
        products,
        totalAmount: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
        paymentStatus: "PENDING"
      },
      whatsappUrl: whatsappUrl
    });
  } catch (error) {
    console.error(error);
    
    // Handle specific validation errors
    if (error.message.includes('Invalid productId format')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Failed to place order"
    });
  }
};
