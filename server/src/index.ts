import express from "express";
import { errorHandler } from "./utils/errorHandler";
import { userRouter } from "./routes/userRouter";
import { authRouter } from "./routes/authRouter";
import { transactionRouter } from "./routes/transactionRouter";
import { withdrawRouter } from "./routes/withdrawRouter";
import { cryptoRouter } from "./routes/cryptoRouter";
import { connectDB } from "./db/db";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
connectDB();
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/transaction", transactionRouter);
app.use("/api/crypto", cryptoRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/withdraw", withdrawRouter);

app.use(errorHandler);

app.listen(5000, () => console.log("Server is running on port 5000"));
