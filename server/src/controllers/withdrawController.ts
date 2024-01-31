import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { withdraws } from "../db/withdraws.json";
import User from "../models/User";

export const postWithdraw = async (req: Request, res: Response, next: any) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
  } catch (err) {
    next({
      err: "Your account balance must be over $20 to withdraw crypto. You can fund your account under the 'My Wallet' section",
    });
  }
};

export const getWithdraws = async (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;
    const { admin } = await User.findById(id).select("admin").exec();
    if (admin) {
      res.status(200).send(withdraws);
      return;
    } else {
      res.status(200).send([]);
    }
  } catch (err) {
    next(err);
  }
};
