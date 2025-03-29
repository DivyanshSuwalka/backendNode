const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { authentication } = require("../middlewares/auth");

const authRouter = express.Router();

// for registering a user
authRouter.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res
      .status(201)
      .json({ message: `${name} registered successfully`, data: user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Registration failed", error: error.message });
  }
});

// for login
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.json({ message: `Welcome ${user?.name} as ${user?.role}.` });
});

// logout existing user
authRouter.post("/logout", authentication, (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
});

module.exports = authRouter;
