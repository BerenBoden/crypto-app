import { body } from "express-validator";
import User from "../models/User";

const postWithdraw = [
  body("id").custom(async (value) => {
    const user = await User.findById(value);
    if (!user.admin) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return Promise.reject(
        "This is only a toy application, you can not withdraw any crypto :("
      );
    }
    if (user.admin) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return Promise.reject(
        "Your account has been limited due to inactivity and withdrawals have been disabled. Please contact support for more information"
      );
    }
  }),
];

export default {
  postWithdraw,
};
