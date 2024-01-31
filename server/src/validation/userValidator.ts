import { body } from "express-validator";
import User from "../models/User";

const addFunds = [
  body("amount")
    .isInt()
    .toInt()
    .custom(async (value) => {
      if (value < 1) {
        return Promise.reject(
          "The minimum deposit is $20. Please increase your amount"
        );
      }
    }),
];

const updateAccount = [
  body("id").custom(async (value) => {
    const user = await User.findById(value);
    if (!user) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return Promise.reject("User not found");
    }
    if (user.admin) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return Promise.reject(
        "Your account has been limited. Updating your information has been disabled"
      );
    }
  }),
  body("firstName")
    .isString()
    .isLength({ min: 1 })
    .withMessage("First name is required")
    .bail()
    .isLength({ max: 20 })
    .custom(async (value, { req }) => {
      const user = await User.findById(req.body.id);
      if (!user) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return Promise.reject("User not found");
      }
      if (user.firstName == value) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return Promise.reject(
          "Please enter a value that is different from your current first name"
        );
      }
    }),
  body("lastName")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Last name is required")
    .bail()
    .isLength({ max: 20 })
    .custom(async (value, { req }) => {
      const user = await User.findById(req.body.id);

      if (!user) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return Promise.reject("User not found");
      }

      if (user.lastName == value) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return Promise.reject(
          "Please enter a value that is different from your current last name"
        );
      }
    }),
];

export default {
  addFunds,
  updateAccount,
};
