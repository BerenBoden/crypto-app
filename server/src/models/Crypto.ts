import mongoose, { Schema, Document } from "mongoose";
import Amount from "./Amount";
import User from "./User";

export interface CryptoDocument extends Document {
  name: string;
  symbol: string;
  link: string;
  price: number;
}

const CryptoSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    link: { type: String },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

CryptoSchema.pre("findOneAndUpdate", async function (next) {
  const crypto: CryptoDocument = await this.model.findOne(this.getQuery());
  const updatedCrypto: any = this.getUpdate();
  const amounts = await Amount.find({ crypto: crypto?._id });
  let users: any = [];
  if (amounts.length == 0) {
    next();
    return;
  }
  const promises = amounts.map(async (amount) => {
    if (!amount) {
      return;
    }
    const foundUser = await User.findById(amount.user);
    if (!foundUser) {
      return;
    }
    if (amount.amountValue <= 0) {
      await Amount.deleteOne({ _id: amount._id });
    } else {
      await Amount.findOneAndUpdate(
        { _id: amount._id },
        { amountValue: Number(amount.amount * updatedCrypto.price) },
        { new: true }
      );
    }
    users.push(foundUser);
  });
  await Promise.all(promises);

  users.map(async (user: any) => {
    const amounts = await Amount.find({ user: user._id });
    user.cryptoBalance = amounts.reduce(
      (a: any, b: any) => a + b.amountValue,
      0
    );
    await user.save();
  });
  next();
});

export default mongoose.model<CryptoDocument>("Crypto", CryptoSchema);
