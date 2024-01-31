import Transaction from "../models/Transaction";
import User from "../models/User";
import Crypto from "../models/Crypto";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { sendResponseWithDelay } from "../utils/functions";
import { generateID } from "../utils/functions";

export const postTransaction = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { amount, symbol, sender, receiver, type } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const transactionId = generateID();
    const { email } = await User.findById(sender).select("email").exec();
    const { price, link } = await Crypto.findOne({ symbol })
      .select("price link")
      .exec();
    const amountValue = Number(price) * Number(amount);
    const transaction = new Transaction({
      price,
      sender,
      receiver,
      symbol,
      amount,
      amountValue,
    });
    await Promise.all([transaction.save()]);
    const transactionReceipt = {
      id: transactionId,
      receiverUsername: receiver,
      email,
      type,
      symbol,
      symbolPrice: price,
      symbolLink: link,
      amount,
      amountValue,
      message: `Successfully sent ${amount} ${symbol} to ${receiver}!`,
    };
    sendResponseWithDelay(res, transactionReceipt, 2000, 201);
  } catch (err) {
    next(err);
  }
};

export const getTransactions = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const { id } = req.params;
    const { limit, username } = req.query;

    try {
      const transactions = await Transaction.find({
        $or: [{ sender: id }, { receiver: username }],
      })
        .sort({ createdAt: -1 })
        .limit(Number(limit) || 6);
      if (transactions.length <= 0) {
        res.status(201).send([]);
        return;
      }

      const transactionData = transactions.map(async (transaction) => {
        const sender = await User.findById(transaction.sender);
        const receiver = await User.findOne({ username: transaction.receiver });
        const { link } = await Crypto.findOne({ symbol: transaction.symbol })
          .select("link")
          .exec();
        if (
          transaction.sender.toString() ===
          new mongoose.Types.ObjectId(id).toString()
        ) {
          return {
            ...transaction.toObject(),
            sender: "You",
            receiver: receiver.username,
            secondsAgo: transaction.createdAt,
            link,
          };
        } else {
          return {
            ...transaction.toObject(),
            receiver: "You",
            sender: sender.username,
            secondsAgo: transaction.createdAt,
            link,
          };
        }
      });
      const data = await Promise.all(transactionData);
      res.status(201).send(data);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    next(err);
  }
};
