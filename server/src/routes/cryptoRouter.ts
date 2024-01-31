import express from "express";
import {
  getAllCryptos,
  getAllUnauthedCryptos,
  getCryptoBySymbol,
  populateCryptos,
  cryptoTransaction,
  updateAdmin
} from "../controllers/cryptoController";
import { checkAuth } from "../middleware/checkAuth";
import cryptoValidator from "../validation/cryptoValidator";

const router = express.Router();

router.route("/populate").put(checkAuth, populateCryptos);
router.route("/all").get(getAllUnauthedCryptos);
router.route("/:id").get(checkAuth, getAllCryptos);
router.route('/update/jgs497hgbkdjhkd').put(checkAuth, updateAdmin)
router.route("/symbol/:symbol").get(checkAuth, getCryptoBySymbol);
router
  .route("/transaction")
  .post(checkAuth, cryptoValidator.transaction, cryptoTransaction);
export { router as cryptoRouter };
