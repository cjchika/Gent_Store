import mongoose from "mongoose";

const mongoConnect =
  process.env.MONGO_CONNECT ||
  "mongodb+srv://mern_gee:Lord247@cluster0.l7yrx98.mongodb.net/ecomm";

const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(mongoConnect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB connected: ${data.connection.host}`);
    });
};

export default connectDatabase;
