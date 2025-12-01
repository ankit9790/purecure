const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");
const {
  signupValidation,
  loginValidation,
} = require("../middleware/validation");


// SIGNUP
router.post("/signup", signupValidation, signup);

// LOGIN
router.post("/login", loginValidation, login);

module.exports = router;