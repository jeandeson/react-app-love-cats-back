import express from "express";
import ProdutoService from "../services/produtoService.js";

const router = express.Router();
const produtoService = new ProdutoService();
router.get("/produtos/:id", async (req, res) => {
  try {
    const result = await produtoService.getById(req.params.id);
    if (result != -1) {
      return res.status(200).json(result);
    }
    return result.status(404).json({});
  } catch (error) {
    return res.status(400).send({ error: "Falha ao obter produto do banco" + error });
  }
});

router.get("/produtos", async (req, res) => {
  try {
    const result = await produtoService.get();
    if (result != -1) {
      return res.status(200).json(result);
    }
    return res.status(404).json([]);
  } catch (error) {
    return res.status(400).send({ error: "Falha ao obter produtos do banco" + error });
  }
});

router.post("/produtos", async (req, res) => {
  try {
    result = await produtoService.post(req.body);
    if (result != -1) {
      return res.status(201).json(result);
    }
    return res.status(404).json({ Erro: "Erro ao inserir, verifique o objeto enviado" });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete("/produtos/:id", async (req, res) => {
  try {
    const result = await produtoService.delete(req.params.id);
    if (result != -1) {
      return res.status(200).json(result);
    }
    return res.status(404).json({ Erro: "erro ao deletar, verifique o id enviado" });
  } catch (error) {
    return res.status(400).send({ error: "Falha ao deletar produto do banco" + error });
  }
});

router.put("/produtos/:id", async (req, res) => {
  try {
    const result = await produtoService.put(req.params.id, req.body);
    if (result != -1) {
      return res.status(200).json(result);
    }
    return res.status(404).json({ Erro: "erro ao atualizar, verifique o conteudo enviado" });
  } catch (error) {
    return res.status(400).send({ error: "Falha ao atualizar produto do banco" + error });
  }
});

export default router;
