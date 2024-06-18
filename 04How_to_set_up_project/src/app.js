import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    //This are the configuration setting of the cors
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16 kb" })); //Set the limit to the server to send signal
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //Url endoded due to this
app.use(express.static("public")); //keep all the asset in the public
app.use(cookieParser());
// cookie-parser is a middleware for Express.js, a Node.js web application framework. It is used to parse cookies attached to the client request object. Cookies are small pieces of data stored on the client-side and sent to the server with each request. cookie-parser helps in reading and parsing these cookies so that they can be accessed and manipulated easily in the application.

//ROUTES import
import userRouter from "./routes/user.routes.js";

//routes declration
app.use("/api/v1/users", userRouter);
//https://localhost/api/v1/users/registers

export { app };
