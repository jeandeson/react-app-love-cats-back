import authController from "./modules/authController.js";
import userController from "./modules/userController.js";
import catController from "./modules/catController.js";
import anyController from "./modules/anyController.js";

import express from "express";
const app = express();
export default () => app.use(authController, userController, catController, anyController);
