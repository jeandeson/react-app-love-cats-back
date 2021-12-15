import express from "express";
const router = express.Router();

router.get("/cats", async (req, res) => {
  try {
    const result = await catService.get();
    if (result != -1) {
      return res.status(200).json(result);
    }
    res.status(404).json(result);
  } catch (error) {
    res.statusMessage = "Get all failed";
    return res.status(500).json({ error: "Internal server error" + error });
  }
});

router.get("/cats/:id", async (req, res) => {
  try {
    const result = await catService.get(req.params.id);
    if (result != -1) {
      return res.status(200).json(result);
    }
    return res.status(404).json({ error: "error tring to get" });
  } catch (error) {
    res.statusMessage = "Get by id failed";
    return res.status(500).json({ error: "Internal server error" + error });
  }
});

router.post("/cats", async (req, res) => {
  try {
    const result = await catService.post(req.body);
    if (result != -1) {
      return res.status(204).json(result);
    }
    return res.status(400).json({ error: "Erro trying to create the cat, verify the content" });
  } catch (error) {
    res.statusMessage = "Insert Failed";
    return res.status(500).json({ error: "Internal server error" + error });
  }
});

router.delete("/cats/:id", async (req, res) => {
  try {
    const result = await catService.delete(req.params.id);
    if (result != -1) {
      return res.status(200).json({ message: "sucess" });
    }
    return res.status(404).json({ error: "Erro trying to delete the cat, verify the id" });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" + error });
  }
});
