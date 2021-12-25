import CatRepository from "../repository/catRepository.js";
import Cat from "../models/cat.js";

const catRepository = new CatRepository();
export default class UserService {
  async getAll() {
    const result = await catRepository.getAll();
    if (result.length > 0) {
      return result;
    }
    return -1;
  }

  async getById(id) {
    const result = await catRepository.getById(id);
    if (result) {
      const handleResult = [...result].shift();
      return handleResult;
    }
    return -1;
  }

  async post(body) {
    const cat = new Cat(body);
    const result = await catRepository.post(cat);
    if (result[0].affectedRows > 0) {
      const { insertId } = [...result].shift();
      cat.id = insertId;
      return cat;
    }
    return -1;
  }

  async update(id, body) {
    const cat = new Cat(body);
    const result = await catRepository.update(id, cat);
    if (result[0].affectedRows > 0) {
      const handleResult = [...result][0].shift();
      return handleResult;
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
