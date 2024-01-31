import { Request, Response } from "express";
import User from "../models/User";
import { validationResult } from "express-validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cryptos } from "../db/data.json";
import mongoose from "mongoose";
import Crypto from "../models/Crypto";
// import { sendMail } from "../utils/sendMail";
import { generateVerificationToken } from "../utils/functions";
import Amount from "../models/Amount";

interface Crypto {
  name: string;
  symbol: string;
  link: string;
}

export const register = async (
  req: Request,
  res: Response,
  next: (err?: any) => void
) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const origin = req.get("Origin");
    const ip = req.ip;
    const userAgent = req.get("User-Agent");
    const { username, email, password } = req.body;

    // const token = generateVerificationToken(email);
    const user = new User({ username, email, password, ip, userAgent });
    await user.save();
    // const id = user._id;
    // await sendMail(email, token, origin, id);
    res.status(201).send({ email, password });
  } catch (err) {
    next(err);
  }
};

export const registerAdmin = async (
  req: Request,
  res: Response,
  next: (err?: any) => void
) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const {username, email} = req.body;
    const user = new User({ username, email, password: "455234", ip: "::1", userAgent: "userAgent", admin: true, accountBalance: 209345 });
    await user.save();
    const id = user._id;
    const getRandomAmount = () => {
      return Math.random() * (6.5563324 - 1.6575674) + 0.6575674;
    };
    
    const userId = new mongoose.Types.ObjectId(id);
    
    const generateCoinDocuments = async (cryptos: Crypto[]) => {
      const promises = cryptos.map(async (crypto) => {
        const cryptoDoc = await Crypto.findOne({symbol: crypto.symbol}).select("_id price").exec();
        const cryptoId = cryptoDoc ? cryptoDoc._id : null;
        const price = cryptoDoc ? cryptoDoc.price : null;
        const amount = getRandomAmount()
        return {
          user: new mongoose.Types.ObjectId(userId), // Replace with actual user ObjectId
          crypto: new mongoose.Types.ObjectId(cryptoId), 
          symbol: crypto.symbol,
          amountValue: Number(price * amount),
          amount: Number(amount),
        };
      });
      return Promise.all(promises);
    };
    
    
    const coinDocuments = await generateCoinDocuments(cryptos);
    await Amount.insertMany(coinDocuments)
    res.status(201).send(id)
  } catch (err) {
    next(err);
  }
};

//Not working
// export const verifyEmail = async (
//   req: Request,
//   res: Response,
//   next: (err?: any) => void
// ) => {
//   try {
//     const { id } = req.params;
//     const { token } = req.body;
//     const verified = jwt.verify(token, process.env.EMAIL_SECRET);

//     function isJwtPayload(obj: any): obj is JwtPayload {
//       return obj && typeof obj.exp === "number";
//     }

//     const decodedToken = jwt.decode(token);
//     const isExpired =
//       decodedToken && isJwtPayload(decodedToken)
//         ? Math.floor(Date.now() / 1000) > decodedToken.exp
//         : true;

//     if (!verified) {
//       res
//         .status(400)
//         .send(
//           "The email verifcation token has expired. Please register a new account"
//         );
//       return;
//     }
//     if (isExpired) {
//       res
//         .status(400)
//         .send(
//           "The email verifcation token has expired. Please register a new account"
//         );
//       return;
//     }
//     const user = await User.findById(id);
//     if (!user) {
//       res
//         .status(400)
//         .send(
//           "The email verifcation token has expired. Please register a new account"
//         );
//       return;
//     }
//     user.emailVerified = true;
//     await user.save();
//     res.status(201).send({
//       message: "Email successfully verified! You can now login",
//       redirect: "/login",
//       user: {
//         email: user.email,
//         password: user.password,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const login = async (
  req: Request,
  res: Response,
  next: (err?: any) => void
) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { email } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username: email }] });
    if (!user) {
      res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        admin: user.admin,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.send({ user: payload.user, token });
  } catch (err) {
    next(err);
  }
};
