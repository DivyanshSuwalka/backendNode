const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 4,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    set: (value) => value.toLowerCase(),
    enum: {
      values: ["admin", "student"],
      message: `{VALUE} is not a valid role.`
    },
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);