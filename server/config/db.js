const { mongoose } = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
      process.exit(1);
    });
};

module.exports = connectDB;
