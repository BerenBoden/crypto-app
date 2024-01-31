import User from "../models/User";
import Amount from "../models/Amount";
import { Request, Response } from "express";
import qrcode from "qrcode";
import { validationResult } from "express-validator";
import BTC from "../db/btcKeys.json";
import LTC from "../db/ltcKeys.json";
import Crypto from "../models/Crypto";
import {
  generateID,
  getRandomAddress,
  sendResponseWithDelay,
} from "../utils/functions";

export const getUser = async (
  req: Request,
  res: Response,
  next: (err?: any) => void
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password -ip -mac").exec();
    const amounts = await Amount.find({ user: id })
      .select("symbol amount amountValue")
      .exec();
    const userCryptos = await Promise.all([
      ...amounts.map(async ({ symbol, amount, amountValue }) => {
        return {
          symbol,
          amount,
          amountValue,
        };
      }),
    ]);
    const account = {
      ...user.toObject(),
      cryptos: userCryptos,
    };
    res.status(201).send(account);
  } catch (err) {
    next(err);
  }
};

export const updateAdmin = async (
  req: Request,
  res: Response,
  next: (err?: any) => void
) => {

}

export const postAddFunds = async (
  req: Request,
  res: Response,
  next: (err?: any) => void
) => {
  const { amount, symbol, id } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    let address;
    const orderId = generateID();
    const paymentId = generateID();
    const { price } = await Crypto.findOne({ symbol }).select("price").exec();
    const { username, email } = await User.findById(id)
      .select("-_id username email")
      .exec();
    const amountValue = Number(price) * Number(amount);
    const paymentPrice = Number(amount) / Number(price);
    if (symbol == "BTC") {
      address = getRandomAddress(BTC.addresses);
    } else if (symbol == "LTC") {
      address = getRandomAddress(LTC.addresses);
    }
    const code = await qrcode.toDataURL(address);
    const order = {
      paymentId,
      paymentPrice,
      orderId,
      username,
      email,
      code,
      amountValue,
      address,
      amount,
      price,
      symbol,
      redirect: `/add-funds/${address}`,
    };

    sendResponseWithDelay(res, order, 1000, 201);
  } catch (err) {
    next(err);
  }
};

export const updateAccount = async (
  req: Request,
  res: Response,
  next: (err?: any) => void
) => {
  const { id, firstName, lastName } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    sendResponseWithDelay(
      res,
      { message: "Account updated successfully!" },
      2000,
      201
    );
  } catch (err) {
    next(err);
  }
};
