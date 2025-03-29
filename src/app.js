const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminStudentRoutes");
const courseRouter = require("./routes/courseRoutes");
const studentRouter = require("./routes/studentRoutes");

const app = express();
const port = 7777;

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/", courseRouter);
app.use("/student", studentRouter);

connectDB()
  .then(() => {
    console.log("DB connected Successfully!");
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  })
  .catch((err) => {
    console.error("Cannot connect to DB!");
  });