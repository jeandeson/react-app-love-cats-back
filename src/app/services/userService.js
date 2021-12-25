import UserRepository from "../repository/userRepository.js";
import User from "../models/user.js";

const userRepository = new UserRepository();
export default class UserService {
  async getAll(name = null, id = null) {
    const result = await userRepository.getAll(name, id);
    if (result.length > 0) {
      return result;
    }
    return -1;
  }

  async getById(id) {
    const result = await userRepository.getById(id);
    if (result[0]) {
      return [...result][0];
    }
    return -1;
  }

  async update(id, body, pass_reset_expires = null, pass_reset_token = null) {
    const user = new User(body);
    user.pass_reset_expires = pass_reset_expires;
    user.pass_reset_token = pass_reset_token;
    const result = await userRepository.update(id, user);
    if (result[0].affectedRows > 0) {
      return result;
    }
    return -1;
  }

  async delete(id) {
    const result = await userRepository.delete(id);
    if (result[0].affectedRows > 0) {
      return result;
    }
    return -1;
  }
}
