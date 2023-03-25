import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB connected: ${data.connection.host}`);
    });
};

export default connectDatabase;
