import { body } from "express-validator";
import User from "../models/User";

const register = [
  body("password")
    .isLength({ min: 1 })
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .isLength({ max: 30 })
    .withMessage("Password must be no more than 30 characters")
    .bail(),
  body("confirmPassword")
    .isLength({ min: 1 })
    .withMessage("Please confirm your password")
    .bail()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
  body("email")
    .trim()
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        return Promise.reject("Email already exists");
      }
    })
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Please provide a valid email")
    .isLength({ max: 40 })
    .withMessage("Email must be no more than 40 characters")
    .bail(),
  body("username")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Username must be at least 6 characters")
    .bail()
    .custom(async (value) => {
      const existingUser = await User.findOne({ username: value });
      if (existingUser) {
        return Promise.reject("username already exists");
      }
    })
    .bail()
    .isLength({ max: 30 })
    .withMessage("Username must be no more than 30 characters"),
];

const login = [
  body("password").isLength({ min: 1 }).withMessage("Password is required"),
  body("email")
    .isLength({ min: 1 })
    .withMessage("Email is required")
    .bail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({
        $or: [{ email: value }, { username: value }],
      });
      if (!user) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Promise.reject("Invalid Credentials");
      }
      if (!user.emailVerified) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Promise.reject("Please verify your email before logging in");
      }
      if (user.password !== req.body.password) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Promise.reject("Invalid Credentials");
      }
    }),
];

export default {
  register,
  login,
};
