const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Admin, Course, Token } = require("../db/index");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { default: mongoose } = require("mongoose");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  await User.create({
    username: username,
    password: password,
  });
  res.json({
    msg: "User created successfully",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    username,
    password,
  });

  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );

    await Token.create({
      username,
      token,
    });
    res.json({
      message: "Token saved",
      token,
    });
  } else {
    res.status(411).json({
      msg: "Invalid credentials",
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const course = await Course.find({});

  res.json({
    courses: course,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic

  const username = req.username;
  const courseId = req.params.courseId;

  console.log(username);

  await User.updateOne(
    {
      username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );
  res.json({
    message: "Course purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.username;
  console.log(username);

  try {
    const user = await User.findOne({
      username,
    });

    const course = await Course.findOne({
      _id: {
        $in: user.purchasedCourses,
      },
    });

    res.json({
      courses: course,
    });
  } catch (e) {
    res.status(404).json({
      msg: "something went wrong",
    });
  }
});

// purchasedCourse API not working

module.exports = router;
