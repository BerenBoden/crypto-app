import express from "express";
import { postWithdraw, getWithdraws } from "../controllers/withdrawController";
import { checkAuth } from "../middleware/checkAuth";
import withdrawValidator from "../validation/withdrawValidator";
const router = express.Router();

router
  .route("/")
  .post(checkAuth, withdrawValidator.postWithdraw, postWithdraw);
router.route("/:id").get(checkAuth, getWithdraws);

export { router as withdrawRouter };
