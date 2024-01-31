import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import { postTransaction, getTransactions } from "../controllers/transactionController";
import transactionValidator from "../validation/transactionValidator";

const router = express.Router();

router.route("/").post(checkAuth, transactionValidator.postTransaction, postTransaction)
router.route('/:id').get(checkAuth, getTransactions);

export { router as transactionRouter };
