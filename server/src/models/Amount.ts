import mongoose, { Document, Schema } from "mongoose";
import { UserDocument } from "./User";
import { CryptoDocument } from "./Crypto";
import User from "./User";

export interface AmountDocument extends Document {
  user: UserDocument["_id"];
  crypto: CryptoDocument["_id"];
  amount: number;
  symbol: string;
  amountValue: number;
}

const AmountSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    crypto: { type: Schema.Types.ObjectId, ref: "Crypto" },
    symbol: { type: String },
    amountValue: {
      type: Number,
      default: 0,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

AmountSchema.pre("save", async function (next) {
  const amount = this;
  console.log(amount);
  if (amount.amountValue <= 0) {
    await amount.remove();
    return;
  }
  const buyer = await User.findById(amount?.user);
  buyer.cryptoBalanceHistory.unshift(buyer.cryptoBalance);
  if (buyer.cryptoBalanceHistory.length > 10) {
    buyer.cryptoBalanceHistory = buyer.cryptoBalanceHistory.slice(0, 10);
  }

  buyer.accountBalanceHistory.unshift(buyer.accountBalance);
  if (buyer.accountBalanceHistory.length > 10) {
    buyer.accountBalanceHistory = buyer.accountBalanceHistory.slice(0, 10);
  }
  await buyer.save();
  next();
});

export default mongoose.model<AmountDocument>("Amount", AmountSchema);
