import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).send({message: "Unauthorized"});
      }
      next();
    } catch (err) {
      res.status(401).send({message: "Unauthorized"});
    }
  } else {
    res.status(401).send({message: "Unauthorized"});
  }
};
