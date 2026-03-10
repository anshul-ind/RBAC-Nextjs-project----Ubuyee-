import mongoose from "mongoose";
const monogoURI = process.env.Mongo_Uri ;
console.log("MongoDB URI:", monogoURI); // Debugging line to check the URI value

if (!monogoURI) {
  throw new Error("MONGODB_URL is not defined in environment variables");
}


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }  
   
   if (!cached.promise) {
    cached.promise = mongoose.connect(monogoURI).then((conn) =>
      conn.connection
     
    );


  try{
    const conn = await cached.promise
    return conn;
  }catch(error){
    console.error("Error connecting to MongoDB:", error);
    throw error;
  } 

}}

export default connectToDatabase;
