import mongoose from 'mongoose'; // Use import instead of require
import dotenv from 'dotenv'; // Use import instead of require

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB; // Export using ES module syntax
