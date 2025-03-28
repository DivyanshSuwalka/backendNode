const express = require("express");
// const connectDB = require("./config/database");

const app = express();
const port = 7777;

app.use((req, res) => {
  console.log("app.use");
  res.send("hello from server!");
});

app.listen(port, () => `Server is listening on port: ${port}`);

// connectDB()
//   .then(() => {
//     console.log("DB connected Successfully!");
//     app.listen(port, () => `Server is listening on port: ${port}`);
//   })
//   .catch((err) => {
//     console.error("Cannot connect to DB!");
//   });
