const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    return mongoose.connection;
  } catch (err) {
    console.error("MongoDB connection failed:", err.message || err);
    throw err;
  }
};

module.exports = connectDB;
