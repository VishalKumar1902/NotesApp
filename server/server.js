const express = require("express");
const connectDB = require("./config/db");
const notesRoutes = require("./routes/notesRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");

const app = express(); // Move this line before using app.use()
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

connectDB(); // call this method to connect to database

//use notes routes
app.use("/api", notesRoutes);

//use userRoutes
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
