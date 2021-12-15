import express from "express";
import UserService from "../../services/userService.js";

const router = express.Router();
const userService = new UserService();

router.get("/users/:id", async (req, res) => {
  try {
    const result = await userService.getById(req.params.id);
    if (result != -1) {
      return res.status(200).json(result);
    }
    return res.status(404).json({});
  } catch (error) {
    return res.status(500);
  }
});

router.get("/users", async (req, res) => {
  try {
    const result = await userService.getAll();
    if (result != -1) {
      return res.status(200).json(result);
    }
    return res.status(404).json([]);
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" + error });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const result = await userService.delete(req.params.id);
    if (result != -1) {
      return res.status(200);
    }
    return res.status(404).json({ Erro: "Erro trying to delete the user, verify the id" });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" + error });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const result = await userService.update(req.params.id, req.body);
    if (result != -1) {
      return res.status(200).json(result);
    }
    return res.status(404).json({ Erro: "Erro trying to update the user, verify the id and body" });
  } catch (error) {
    return res.status(500).send({ error: "Internal serve error" + error });
  }
});

export default router;
