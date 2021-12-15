import express from "express";
const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    const result = await postService.getAll();
    if (result != -1) {
      return res.status(200).json(result);
    }
    return res.status(404).json([]);
  } catch (error) {
    res.statusMessage = "Interal server error " + error.message;
    return res.status(500);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const result = await postService.get(req.params.id);
    if (result != -1) {
      return res.status(200).json(result);
    }
  } catch (error) {
    res.statusMessage = "Interal server error " + error.message;
    return res.status(500);
  }
});

router.post("/posts", async (req, res) => {
  try {
    const result = await postService.post(req.body);
    if (result != -1) {
      return res.status(200).json(result);
    }
    res.statusMessage = "failed trying to create a new post";
    return res.status(400);
  } catch (error) {
    res.statusMessage = "Interal server error " + error.message;
    return res.status(500);
  }
});

router.put("/posts/:id", async (req, res) => {
  try {
    const result = await postService.put(req.params.id, req.body);
    if (result != -1) {
      return res.status(200).json(result);
    }
    res.statusMessage = "failed trying to update a new post";
    return res.status(400);
  } catch (error) {
    res.statusMessage = "Interal server error " + error.message;
    return res.status(500);
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    const result = await postService.delete(req.params.id);
    if (result != -1) {
      return res.status(200).json(result);
    }
    res.statusMessage = "Erro trying to delete the post, verify the id";
    return res.status(404);
  } catch (error) {
    res.statusMessage = "Interal server error " + error.message;
    return res.status(500);
  }
});
