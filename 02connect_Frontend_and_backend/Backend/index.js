import express from "express"; //add type :module in package json
// const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready ");
});

//standerisation following to avoid CORS
app.get("/api/jokes", (req, res) => {
  const jokes = [
    { id: 1, title: "Jokes", content: "This is a joke " },
    {
      id: 2,
      title: "second joke",
      content: "This is secon joke",
    },
    {
      id: 3,
      title: "third joke",
      content: "This is third joke",
    },
    {
      id: 4,
      title: "fouth joke",
      content: "This is fouth joke",
    },
    {
      id: 5,
      title: "fifth joke",
      content: "This is fifth joke",
    },
  ];
  res.send(jokes);
});

const port = process.env.PORT || 5000; //connect to the env port if not use 3000

app.listen(port, () => {
  console.log(`Serve at https://localhost:${port}`); //No the http actual link its adde automatically
});
