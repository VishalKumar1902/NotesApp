const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // extract the token from the header
  const token = req.header("Authorization")?.split(" ")[1]; // Expecting Bearer token format

  // if no token found end the middleware function
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    // if token found verify it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

//use middleware for the protected routes
module.exports = authenticate;
