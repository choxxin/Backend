import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({
  path: "./.env",
});

connectDB();

//PART 1 method of connecting db
/*
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
  app.listen(process.env.PORT, () => {
    console.log(`App is running in the port ${process.env.PORT}`);
  });
})();
// IIFEs prevent pollution of the global JS scope. In a traditional function, if you create a variable within the function, it is accessible in the global object. If you define a variable in an IIFE, it is accessible only directly within the function.
//The bracket you see ()() is the IFEE
*/
