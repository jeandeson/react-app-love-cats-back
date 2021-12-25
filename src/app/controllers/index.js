import express from "express";
import authController from "./modules/authController.js";
import likeController from "./modules/likeController.js";
import actionController from "./modules/actionController.js";
import userController from "./modules/userController.js";
import catController from "./modules/catController.js";
import postController from "./modules/postController.js";
import anyController from "./modules/anyController.js";

const app = express();
export default () =>
  app.use(
    authController,
    actionController,
    likeController,
    userController,
    catController,
    postController,
    anyController
  );
