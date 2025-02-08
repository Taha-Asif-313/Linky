import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDb connected!");
    })
    .catch(() => {
      console.log("MongoDb not connected!");
    });
};

export default connectDb;
