const validator = require("validator");

const validateSignUpData = (req) => {
    const { name, email, password, role } = req.body;
  if (!name) throw new Error("Name Invalid!");
  else if (!validator.isEmail(email)) throw new Error("Email Invalid!");
  else if (!validator.isStrongPassword(password)) throw new Error("Password Invalid!");
  else if(!(role.toLowerCase() === "student"||role.toLowerCase() === "admin")) throw new Error("Role not valid!");
};

module.exports = { validateSignUpData };
