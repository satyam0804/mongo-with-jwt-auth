const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://satyam08:3971tuNCnLfYdMN4@cluster0.k771ssh.mongodb.net/"
);

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

const UserToken = new mongoose.Schema({
  // Schema definition here
  username: String,
  token: String,
});

const adminToken = new mongoose.Schema({
  // Schema definition here
  username: String,
  token: String,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);
const Token = mongoose.model("UserToken", UserToken);
const AdminToken = mongoose.model("adminToken", adminToken);

module.exports = {
  Admin,
  User,
  Course,
  Token,
  AdminToken,
};
