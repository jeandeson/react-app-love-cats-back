import CatRepository from "../repository/catRepository.js";
import Cat from "../models/user.js";

const catRepository = new CatRepository();
export default class UserService {
  async getAll() {
    const result = await catRepository.getAll();
    if (result.length > 0) {
      return result;
    }
    return -1;
  }

  async getById(id = null) {
    const result = await catRepository.getById(id);
    if (result[0].length > 0) {
      return [...result][0].shift();
    }
    return -1;
  }

  async update(id, body) {
    const cat = new Cat(body);
    const result = await catRepository.update(id, cat);
    if (result[0].affectedRows > 0) {
      return result;
    }
    return -1;
  }

  async delete(id) {
    const result = await catRepository.delete(id);
    if (result[0].affectedRows > 0) {
      return result;
    }
    return -1;
  }
}
