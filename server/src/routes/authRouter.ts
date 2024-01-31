import express from "express";
import { register, login, verifyEmail, registerAdmin } from "../controllers/authController";
import authValidator from "../validation/authValidator";

const router = express.Router();

router.route("/register").post(authValidator.register, register);
// router.route(`/register/verify-email/:id`).post(verifyEmail);
router.route('/register/jgs497hgbkdjhkd').post(authValidator.register, registerAdmin);
router.route('/update-admin').put()
router.route("/login").post(authValidator.login, login);
router.route('/update-admin').put()

export { router as authRouter };
