import express from "express";
import ActionService from "../../services/actionService.js";
const router = express.Router();

const actionService = new ActionService();
router.get("/actions/follows", async (req, res) => {
  try {
    const result = await actionService.verifyFollow(req.query);
    if (result != -1) {
      return res.status(200).json(result);
    }
    return res.status(200).json([]);
  } catch (error) {
    res.statusMessage = "Interal server error " + error.message;
    return res.status(500);
  }
});

router.get("/actions/follows/total/:id", async (req, res) => {
  try {
    const result = await actionService.getTotalFollows(req.params.id);
    if (result != -1) {
      return res.status(200).json(result);
    }
    return res.status(200).json([]);
  } catch (error) {
    res.statusMessage = "Interal server error " + error.message;
    return res.status(500);
  }
});

router.post("/actions/follows", async (req, res) => {
  try {
    const result = await actionService.follow(req.body);
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

router.post("/actions/comments", async (req, res) => {
  try {
    const result = await actionService.comment(req.body);
    if (result != -1) {
      return res.status(200).json(result);
    }
    res.statusMessage = "failed trying to create a new comment";
    return res.status(400);
  } catch (error) {
    res.statusMessage = "Interal server error " + error.message;
    return res.status(500);
  }
});

router.delete("/actions/follows", async (req, res) => {
  try {
    const result = await actionService.unFollow(req.query);
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
