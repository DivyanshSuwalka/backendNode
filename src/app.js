const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const authRouter = require("./routes/authRoutes");

const app = express();
const port = 7777;

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter)

connectDB()
  .then(() => {
    console.log("DB connected Successfully!");
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  })
  .catch((err) => {
    console.error("Cannot connect to DB!");
  });
/**
 *
 *
 *
 *
 *
 *
 *
 *
 */
// app.post("/signup", async (req, res) => {
//   // console.log(req.body);
//   try {
//     // {
//     //   firstName: "Divyansh",
//     //   lastName: "Suwalka",
//     //   emailId: "abc@gmail.com",
//     //   courses: ["maths", "science"],
//     // }
//     const user = new User(req.body);
//     await user.save();
//     res.json({ user });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.get("/users", async (req, res) => {
//   // console.log({ firstName: req.body.firstName });
//   try {
//     const user = await User.find({});
//     if (!user) throw new Error("User not found!");
//     res.json({ data: user });
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

//
//
//
//
// app.post("/", (req, res) => {
//   res.send();
// });
// app.use((req, res, next) => {
//   console.log("app.use");
//   res.send("hello from server!");
// });
