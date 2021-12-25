import LikeRepository from "../repository/likeRepository.js";

const likeRepository = new LikeRepository();
class postService {
  async getAll(post_id) {
    const result = await likeRepository.getAll(post_id);
    if (result.length > 0) {
      return result;
    }
    return -1;
  }

  async getById(id) {
    const result = await likeRepository.getById(id);
    if (result) {
      const handleResult = [...result].shift();
      return handleResult;
    }
    return -1;
  }

  async update(id, body) {
    const result = await likeRepository.update(id, body);
    if (result[0].affectedRows > 0) {
      const handleResult = [...result][0].shift();
      return handleResult;
    }
    return -1;
  }

  async delete(id) {
    const result = await likeRepository.delete(id);
    if (result[0].affectedRows > 0) {
      return result;
    }
    return -1;
  }

  async post(body) {
    const result = await likeRepository.post(body);
    if (result[0].affectedRows > 0) {
      const { insertId } = [...result].shift();
      body.id = insertId;
      return body;
    }
    return -1;
  }
}

export default postService;
