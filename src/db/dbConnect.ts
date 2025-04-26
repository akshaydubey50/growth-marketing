import mongoose from "mongoose";
import { MongodbConf } from "@/conf/conf";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export default async function connectDB(): Promise<void> {
  //check if DB is already connected
  if (connection.isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    //if DB is not connected then connect
    if (!MongodbConf.MONGO_URI) {
      throw new Error("Please define MONGO_URL env variable");
    }

    const db = await mongoose.connect(
      MongodbConf.MONGO_URI + "/" + MongodbConf.DB_NAME
    );
    connection.isConnected = db.connections[0].readyState;

    console.log("Connected to MongoDB");
  } catch (e: any) {
    console.log("Error while connecting to MongoDB", e.message);
    process.exit(1);
  }
}
