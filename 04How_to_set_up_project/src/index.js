import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running on the port : ${process.env.PORT} `);
    });
  })
  .catch((err) => {
    console.log("mongo db failed to connect ||", err);
  });

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
