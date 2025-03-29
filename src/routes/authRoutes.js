const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { authentication } = require("../middlewares/auth");
const { validateSignUpData } = require("../utils/validation");

const authRouter = express.Router();

// for registering a user
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
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
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials!");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token);
    res.json({ message: `Welcome ${user?.name} as ${user?.role}.` });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Login failed", error: error.message });
  }
});

// logout existing user
authRouter.post("/logout", authentication, (req, res) => {
  try {
    res.clearCookie("token").json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Logout failed", error: error.message });
  }
});

module.exports = authRouter;
