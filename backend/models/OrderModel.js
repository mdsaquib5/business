import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        name: String,
        quantity: Number,
        price: Number
      }
    ],
    status: {
      type: String,
      default: "PENDING"
    },
    paymentStatus: {
      type: String,
      default: "PENDING"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);