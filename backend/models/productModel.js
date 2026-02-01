import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: Array,
      required: true
    },
    stock: {
      type: Number,
      default: 10
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);