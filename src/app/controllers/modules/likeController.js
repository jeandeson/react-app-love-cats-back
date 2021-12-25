import express from "express";
const router = express.Router();
import LikeService from "../../services/likeService.js";

const likeService = new LikeService();
router.get("/likes", async (req, res) => {
  try {
    const result = await likeService.getAll(req.query.post_id);
    if (result != -1) {
      return res.status(200).json(result);
    }
    return res.status(200).json([]);
  } catch (error) {
    res.statusMessage = "Interal server error " + error.message;
    return res.status(500);
  }
});

router.post("/likes", async (req, res) => {
  try {
    const result = await likeService.post(req.body);
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

router.delete("/likes/:id", async (req, res) => {
  try {
    const result = await likeService.delete(req.params.id);
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

export default router;
