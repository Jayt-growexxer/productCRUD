const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE;
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const con = await mongoose.connect(DB, {});

    console.log(`✅ Connected to DB file: ${con.connection.host}`);

    // Start the server only after a successful DB connection
  } catch (err) {
    console.error(`❌ DB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
