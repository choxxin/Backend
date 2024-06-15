require("dotenv").config();
// import "dotenv/config";
const express = require("express");
const app = express();
const port = 4000;

//This is a fuc.. server as it send data and receive it (req,res)
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/ansh", (req, res) => {
  res.send(" <h1> Hello mf</h1>");
});
app.get("/github", (req, res) => {
  res.json({
    name: "ansh",
    cllg: "lapu",
    phno: "meow",
  });
});
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
app.listen(process.env.PORT, () => {
  //getting port from .env
  console.log(`Example app listening on port ${port}`);
});
