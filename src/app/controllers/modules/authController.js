import express from "express";
import AuthService from "../../services/authService.js";

import crypto from "crypto";

const router = express.Router();
const authService = new AuthService();

router.post("/auth/register", async (req, res) => {
  try {
    const result = await authService.register(req.body);
    if (result != -1) {
      return res.status(201).json(result);
    }
    res.statusMessage = "Registration failed";
    return res.status(400).json({ Erro: "Error trying to regristry new user verify the fields" });
  } catch (error) {
    return res.status(500).json({ error: "Error trying to create " + error });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const result = await authService.login(req.body);
    if (result != -1) {
      return res.status(200).json(result);
    }
    res.statusMessage = "Incorrect email or password";
    res.status(404).end();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" + error });
  }
});

router.post("/auth/reset_password", async (req, res) => {
  try {
    const { email, token, password } = req.body;
    const user = await authService.forgot(email);
    if (user) {
      const result = await authService.resetPassword(email, token, password);
      if (result !== -1) {
        return res.status(200).json({ result: result });
      }
      return res.status(400).json({ error: "token invalid or expirated" });
    }
    return res.status(400).json({ error: "user not found" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error " + error });
  }
});

router.post("/auth/forgot_password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await authService.forgot(email);
    if (!user) {
      return res.status(400).json({ error: "Email invalid or not registred" });
    }
    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1);
    await authService.updateUserToken(user.id, now, token);
    const result = await authService.sendResetPasswordToken(email, token);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "internal server error" + error });
  }
});

export default router;
