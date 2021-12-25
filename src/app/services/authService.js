import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mailer from "../../modules/mailler.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const authConfig = require("../../config/auth.json");

import AuthRepository from "../repository/authRepository.js";
import UserService from "./userService.js";

const userService = new UserService();
const authRepository = new AuthRepository();

export default class AuthService {
  generateToken(params = {}) {
    const token = jwt.sign(params, authConfig.secrete, { expiresIn: "1d" });
    return token;
  }

  async compareUserPassword(userPassword, ecriptedPassword) {
    const compare = await bcrypt.compare(userPassword, ecriptedPassword);
    return compare;
  }

  async register(body) {
    const user = new User(body);
    user.password = await bcrypt.hash(user.password, 10);
    const result = await authRepository.register(user);
    if (result) {
      user.id = result[0].insertId;
      const catResult = await authRepository.registerCat(user.id, user.cat);
      if (catResult) {
        return { user, token: this.generateToken({ id: user.id }) };
      }
    }
    return -1;
  }

  async login(body) {
    const user = new User(body);
    const result = await authRepository.login(user);
    if (result[0].length > 0) {
      const handleResult = [...result][0].shift();
      const compare = await bcrypt.compare(user.password, handleResult.password);
      if (compare) {
        user.id = handleResult.id;
        user.name = handleResult.user_name;
        user.email = handleResult.email;
        user.image = handleResult.user_image;
        user.cat = {
          catName: handleResult.catName,
          color: handleResult.color,
          gerere: handleResult.genere,
          image: handleResult.cat_image,
          user_id: handleResult.id,
        };
        user.password = undefined;
        return { user, token: this.generateToken({ id: user.id }) };
      }
    }
    return -1;
  }

  async updateUserToken(id, pass_reset_expires, pass_reset_token) {
    const result = await authRepository.updateUserToken(id, pass_reset_expires, pass_reset_token);
    if (result[0].affectedRows > 0) {
      return result;
    }
    return -1;
  }

  async sendResetPasswordToken(email, token) {
    mailer.sendMail(
      {
        to: email,
        from: "jeandesonteste@gmail.com",
        subject: "password reset code",
        template: "auth/forgot_password",
        context: { token },
      },
      (erro) => {
        if (erro) {
          return { error: "Error sending email" + erro };
        }
        return { sucess: "The email was be sent" };
      }
    );
  }

  async forgot(email) {
    const result = await authRepository.forgot(email);
    if (result) {
      const handleResult = [...result][0].shift();
      return handleResult;
    }
    return -1;
  }

  async resetPassword(email, token, password) {
    const user = await authRepository.forgot(email);
    const handleUser = [...user][0].shift();
    const now = new Date();
    if (handleUser.pass_reset_token === token && now < handleUser.pass_reset_expires) {
      handleUser.password = await bcrypt.hash(password, 10);
      const result = await userService.update(handleUser.id, handleUser);
      if (result[0].affectedRows > 0) {
        return result;
      }
    }
    return -1;
  }
}
