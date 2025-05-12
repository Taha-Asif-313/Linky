import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDb connected!");
    })
    .catch((err) => {
      console.log("MongoDb not connected!");
      console.log(err);
    });
};

export default connectDb;
