const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course, AdminToken } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username,
    password,
  });
  res.json({
    msg: "Admin Created Successfully",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const admin = await Admin.findOne({
    username,
    password,
  });

  if (admin) {
    const jwttoken = jwt.sign(username, JWT_SECRET);
    // const jwttoken = jwt.sign({ username, password }, JWT_SECRET);
    res.json({
      jwttoken,
    });

    await AdminToken.create({
      username,
      token: jwttoken,
    });
  } else {
    res.status(411).json({
      msg: "Invalid Credentials Error",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });
  res.json({
    msg: "Course Created Successfully",
    newCourse,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const course = await Course.find({});

  res.json({
    courses: course,
  });
});

module.exports = router;

//eyJhbGciOiJIUzI1NiJ9.YWRtaW4xQGdtYWlsLmNvbQ.YvY4EJFRFbOKm8v_egZpdZYY-YiYZ5XBgb8OMVl4X2M
