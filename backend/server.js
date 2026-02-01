import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

const PORT = process.env.PORT || 4000;

connectDB();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});