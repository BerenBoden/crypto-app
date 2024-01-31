import Crypto from "../models/Crypto";
import { Request, Response } from "express";
import { cryptos } from "../db/data.json";
import { cryptoApi } from "../utils/api";
import { populateCrypto } from "../utils/functions";
import User from "../models/User";
import Amount, { AmountDocument } from "../models/Amount";
import { validationResult } from "express-validator";
import { sendResponseWithDelay } from "../utils/functions";
import { generateID } from "../utils/functions";
import mongoose from "mongoose";

interface Crypto {
  name: string;
  symbol: string;
  link: string;
}

export const populateCryptos = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const cryptoUri = populateCrypto(cryptos);
    const { data } = await cryptoApi.get(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${cryptoUri}&tsyms=USD,EUR`
    );

    const updatePromises = cryptos.map(({ name, symbol, link }) =>
      Crypto.findOneAndUpdate(
        { name, link },
        { symbol, price: data[symbol].USD },
        { upsert: true, new: true }
      )
    );

    const updatedCrypto = await Promise.all(updatePromises);

    res.status(201).send(updatedCrypto);
  } catch (err) {
    next(err);
  }
};

export const getAllUnauthedCryptos = async (req: Request, res: Response, next: any) => {
  try {
    const cryptos = await Crypto.find();
    res.status(201).send(cryptos);
  } catch (err) {
    next(err);
  }
}

export const getAllCryptos = async (req: Request, res: Response, next: any) => {
  const { id } = req.params;
  try {
    const [userAmounts, cryptoCoins] = await Promise.all([
      Amount.find({ user: id }),
      Crypto.find(),
    ]);

    const userAmountsMap: { [key: string]: any } = {};
    for (const userAmount of userAmounts) {
      userAmountsMap[userAmount.crypto.toHexString()] = userAmount;
    }

    const allCryptos = cryptoCoins
      .map((cryptoCoin: any) => {
        const updatedCryptoCoin = { ...cryptoCoin.toObject() };
        const userAmount = userAmountsMap[cryptoCoin._id.toHexString()];
        if (userAmount) {
          updatedCryptoCoin.amount = userAmount.amount;
          updatedCryptoCoin.amountValue = userAmount.amountValue;
        } else {
          updatedCryptoCoin.amount = 0;
          updatedCryptoCoin.amountValue = 0;
        }
        return updatedCryptoCoin;
      })
      .sort((a, b) => parseFloat(b.amountValue) - parseFloat(a.amountValue));

    res.status(201).send(allCryptos);
  } catch (err) {
    next(err);
  }
};

export const getCryptoBySymbol = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const { symbol } = req.params;
    const crypto = await Crypto.findOne({ symbol });
    res.status(201).send(crypto);
  } catch (err) {
    next(err);
  }
};

export const updateAdmin = async (req: Request, res: Response, next: any) => {
  try {
    const getRandomAmount = () => {
      return Math.random() * (6.5563324 - 1.6575674) + 0.6575674;
    };
    const { username } = req.body;
    const user = await User.findOne({ username });
    const generateCoinDocuments = async (cryptos: Crypto[]) => {
      const promises = cryptos.map(async (crypto) => {
        const cryptoDoc = await Crypto.findOne({ symbol: crypto.symbol })
          .select("_id price")
          .exec();
        const ownerAmount: AmountDocument =
          (await Amount.findOne({
            user: user._id,
            crypto: cryptoDoc._id,
          })) ||
          new Amount({
            user: user._id,
            crypto: cryptoDoc._id,
            symbol: cryptoDoc.symbol,
            amount: 0,
            amountValue: 0,
          });
        const amount = getRandomAmount();
        await Amount.findOneAndUpdate(
          { _id: ownerAmount._id },
          {
            $inc: {
              amountValue: Number(amount * cryptoDoc.price),
              amount: Number(amount),
            },
          },
          { new: true }
        );
      });
      return Promise.all(promises);
    };
    await generateCoinDocuments(cryptos);
    res.status(201).send(user._id);
  } catch (err) {
    next(err);
  }
};

export const cryptoTransaction = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { type, symbol, amount, sender } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const transactionId = generateID();
    const user = await User.findById(sender);
    const crypto = await Crypto.findOne({ symbol });
    const amountValue = crypto.price * Number(amount);
    const ownerAmount: AmountDocument =
      (await Amount.findOne({
        user: user._id,
        crypto: crypto._id,
      })) ||
      new Amount({
        user: user._id,
        crypto: crypto._id,
        symbol,
        amount: 0,
        amountValue: 0,
      });
    console.log(ownerAmount);
    // user.cryptoBalance = ownerAmount.reduce(
    //   (a: any, b: any) => a + b.amountValue,
    //   0
    // );

    if (type === "purchase") {
      user.accountBalance -= amountValue;
      ownerAmount.amount += Number(amount);
      ownerAmount.amountValue += Number(amountValue);

      await Promise.all([ownerAmount.save(), user.save(), crypto.save()]);
      const purchaseReceipt = {
        id: transactionId,
        email: user.email,
        type,
        symbol,
        amountValue,
        symbolPrice: crypto.price,
        symbolLink: crypto.link,
        amount,
        message: `Successfully Purchased ${amount} ${symbol}!`,
      };
      sendResponseWithDelay(res, purchaseReceipt, 2000, 201);
    } else if (type === "sell") {
      user.accountBalance += amountValue;
      ownerAmount.amount -= Number(amount);
      if (ownerAmount.amount <= 0) {
        await ownerAmount.deleteOne();
      } else {
        await ownerAmount.save();
      }
      await Promise.all([user.save(), crypto.save()]);

      const sellReceipt = {
        id: transactionId,
        email: user.email,
        type,
        symbol,
        amountValue,
        symbolPrice: crypto.price,
        symbolLink: crypto.link,
        amount,
        message: `Successfully Sold ${amount} ${symbol}!`,
      };
      sendResponseWithDelay(res, sellReceipt, 2000, 201);
    } else {
      res.status(400).json({ message: "Invalid transaction type" });
    }
  } catch (err) {
    next(err);
  }
};
