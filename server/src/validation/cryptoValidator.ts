import { body } from "express-validator";
import User from "../models/User";
import Crypto from "../models/Crypto";
import Amount from "../models/Amount";

const transaction = [
  body("amount").custom(async (value, { req }) => {
    const user = await User.findById(req.body.sender)
      .select("admin accountBalance")
      .exec();
    const ownerAmount = await Amount.findOne({
      $and: [{ symbol: req.body.symbol }, { user: req.body.sender }],
    });

    const { price } = await Crypto.findOne({ symbol: req.body.symbol })
      .select("price")
      .exec();
    const purchasePrice = price * value;
    if (!value || 0 || value < 0.0000005) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return Promise.reject(
        `The minimum ${req.body.type} amount for ${req.body.symbol} is 0.0000005`
      );
    }
    if (value > 999999) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return Promise.reject(
        `The maximum ${req.body.type} amount for ${req.body.symbol} is 999999`
      );
    }
    if (req.body.type === "purchase") {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(user.accountBalance, purchasePrice);
      if (user.accountBalance < purchasePrice) {
        return Promise.reject(
          `You do not have enough account balance to purchase ${value} ${req.body.symbol}. You can fund your account under the 'My Wallet' section`
        );
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (!ownerAmount || ownerAmount.amount < value) {
        return Promise.reject(
          `You do not have enough ${req.body.symbol} to sell this amount.`
        );
      }
      if (!user.admin) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return Promise.reject(
          `Your account must be verified to sell crypto. You can verify your account under the 'My Wallet' section by adding funds`
        );
      }
    }
    if (value > 0.5 && user.admin) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return Promise.reject(
        `Your account has been limited due to inactivity. You can only ${req.body.type} 0.5 ${req.body.symbol} at a time. Please contact support for more information`
      );
    }
  }),
];

export default {
  transaction,
};
