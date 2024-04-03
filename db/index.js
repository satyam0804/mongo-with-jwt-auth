const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("your-mongodb-url");

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: string,
  password: string,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: string,
  password: string,
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: string,
  description: string,
  imageLink: string,
  price: number,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
