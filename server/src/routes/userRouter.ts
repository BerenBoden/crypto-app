import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import {
  getUser,
  postAddFunds,
  updateAccount,
} from "../controllers/userController";
import userValidator from "../validation/userValidator";

const router = express.Router();

router.route("/:id").get(checkAuth, getUser);
router
  .route("/add-funds")
  .post(checkAuth, userValidator.addFunds, postAddFunds);
router
  .route("/update")
  .put(checkAuth, userValidator.updateAccount, updateAccount);
export { router as userRouter };
