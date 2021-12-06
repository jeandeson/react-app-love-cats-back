import authController from "./authController.js";
import userController from "./userController.js";
import anyController from "./anyController.js";

import express from "express";
const app = express();
export default () => app.use(authController, userController, anyController);
