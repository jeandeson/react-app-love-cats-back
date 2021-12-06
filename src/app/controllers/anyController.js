import express from "express";
import midlewares from "../midlewares/auth.js";

//ROTA PROTEGIDA ACESSADA SOMENTE ATRAVÉS DE UM TOKEN VALIDO.
const router = express.Router();
router.use(midlewares);

router.get("/protected", (req, res) => {
  return res.send({ ok: true });
});

export default router;
