import mongoose, { Schema, Document } from "mongoose";
import Amount, { AmountDocument } from "./Amount";
import User from "./User";
import Crypto from "./Crypto";
import { UserDocument } from "./User";

export interface TransactionDocument extends Document {
  sender: UserDocument["_id"];
  receiver: UserDocument["_id"];
  symbol: string;
  amount: number;
  amountValue: number;
  price: number;
  createdAt: Date;

}

const TransactionSchema: Schema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: String },
    symbol: { type: String },
    amount: { type: Number },
    amountValue: { type: Number },
    price: { type: Number },
    createdAt: { type: Date, expires: 60 * 60 * 24 * 7, default: Date.now },
  },
  {
    timestamps: true,
  }
);

TransactionSchema.pre("save", async function (next) {
  const transaction = this;
  const crypto = await Crypto.findOne({ symbol: transaction.symbol });
  const [sender, senderCryptos] = await Promise.all([
    User.findById(transaction.sender),
    Amount.findOneAndUpdate(
      { symbol: transaction.symbol, user: transaction.sender },
      { $inc: { amount: -transaction.amount } },
      { new: true }
    ),
  ]);
  const receiver: UserDocument = await User.findOne({
    username: transaction.receiver,
  });
  const receiverCryptos: AmountDocument = await Amount.findOneAndUpdate(
    { symbol: transaction.symbol, user: receiver._id },
    { $inc: { amount: transaction.amount } },
    { new: true }
  );
  if (!receiverCryptos) {
    const newReceiverCryptos = new Amount({
      user: receiver._id,
      symbol: transaction.symbol,
      crypto: crypto._id,
      amount: transaction.amount,
      amountValue: transaction.amount * crypto.price,
      price: crypto.price,
    });
    await newReceiverCryptos.save();
    next();
    return;
  }
  sender.cryptoBalanceHistory.unshift(sender.cryptoBalance);
  if (sender.cryptoBalanceHistory.length > 10) {
    sender.cryptoBalanceHistory = sender.cryptoBalanceHistory.slice(0, 10);
  }

  receiver.cryptoBalanceHistory.unshift(receiver.cryptoBalance);
  if (receiver.cryptoBalanceHistory.length > 10) {
    receiver.cryptoBalanceHistory = receiver.cryptoBalanceHistory.slice(0, 10);
  }
  await sender.save();
  await receiver.save();
  next();
});

export default mongoose.model<TransactionDocument>(
  "Transaction",
  TransactionSchema
);
