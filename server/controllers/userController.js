const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// register a user

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //check if user already exists
    const existingUser = await User.findOne({ email });

    // if user exists end the function
    if (existingUser) {
      return res.status(400).json({ message: error.message });
    }
    //otherwise hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user with hashed password
    const user = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = await User.create(user);
    await newUser.save(); // this is not needed since create save the document

    // send a response if user is saved
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    // If no user found, end the function
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid credentials, no user found" });
    }

    // Otherwise, compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    // If isMatch is false
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Generate a token if everything is fine
    const token = jwt.sign(
      { id: user._id, username: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send this token and user info as a response
    return res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get user details

module.exports = {
  signup,
  login,
};
