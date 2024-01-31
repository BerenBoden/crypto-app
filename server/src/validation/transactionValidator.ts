import { body } from "express-validator";
import User from "../models/User";
import Amount from "../models/Amount";
import Crypto from "../models/Crypto";

const postTransaction = [
  body("sender").custom(async (value, { req }) => {
    const sender = await User.findById(value);
    if (!value) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return Promise.reject("Sender is required");
    }
    if (!sender) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return Promise.reject("Sender is required");
    }
  }),
  body("amount").custom(async (value, { req }) => {
    const crypto = await Crypto.findOne({ symbol: req.body.symbol })
      .select("_id")
      .exec();
    const sender = await User.findById(req.body.sender).select("admin").exec();
    const senderBalance = await Amount.findOne({
      $and: [{ crypto: crypto._id }, { user: req.body.sender }],
    });
    if (!crypto) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.reject(`You currently have no crypto assets`);
    }
    if (!senderBalance) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.reject(
        `You do not have any ${req.body.symbol} to send this transaction`
      );
    }
    if (
      Math.ceil(senderBalance.amount * Math.pow(10, 1)) / Math.pow(10, 1) <
      value
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.reject(
        `You do not have enough ${req.body.symbol} to send this transaction`
      );
    }
    if (value < 0.05) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.reject(
        `The minimum transfer amount for ${req.body.symbol} is 0.05`
      );
    }
  }),
  body("receiver").custom(async (value, { req }) => {
    const sender = await User.findById(req.body.sender)
      .select("username")
      .exec();
    const receiver = await User.findOne({ username: value });
    if (sender.username === req.body.receiver) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.reject("You cannot transfer to yourself");
    }
    if (!receiver) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return Promise.reject(
        "There is no account associated with that username"
      );
    }
    if (!receiver.admin && receiver.cryptoBalance > 20000) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return Promise.reject(
        "The receiver account is not verified. The maximum value of crypto currency an unverfied account can receive is $20,000 USD"
      );
    }
  }),
];

export default { postTransaction };
