import mongoose from "mongoose";
export default async function initConnect() {
  const MONGO_URI = <string>process.env.MONGO_URI;
  try {
    console.load("Connecting to database...");
    const connection = await mongoose.connect(MONGO_URI);
    console.succeed(`MongoDB connected: ${connection.connection.host}`);
    return connection.connection;
  } catch (error) {
    console.fail("Error connecting to database");
    process.exit(1);
  }
}
