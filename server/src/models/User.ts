import mongoose, { Schema, Document, Mongoose } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  ip: string;
  userAgent: string;
  accountBalance: number;
  cryptoBalance: number;
  cryptoBalanceHistory: number[];
  accountBalanceHistory: number[];
  admin: boolean;
  emailVerified: Boolean;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    ip: { type: String },
    userAgent: { type: String },
    accountBalance: {
      type: Number,
      default: 0,
    },
    cryptoBalance: {
      type: Number,
      default: 0,
    },
    admin: { type: Boolean, default: false },
    cryptoBalanceHistory: {
      type: [Number],
      default: [],
    },
    emailVerified: {
      type: Boolean,
      default: true,
    },
    accountBalanceHistory: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserDocument>("User", UserSchema);
