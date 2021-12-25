import PostRepository from "../repository/postRepository.js";
import Post from "../models/post.js";

const postRepository = new PostRepository();
class postService {
  async getAll(id) {
    const result = await postRepository.getAll(id);
    if (result.length > 0) {
      return result;
    }
    return -1;
  }

  async getById(id) {
    const result = await postRepository.getById(id);
    if (result.length > 0) {
      return result[0];
    }
    return -1;
  }

  async post(body) {
    const post = new Post(body);
    const result = await postRepository.post(post);
    if (result[0].affectedRows > 0) {
      const { insertId } = [...result].shift();
      post.id = insertId;
      return post;
    }
    return -1;
  }
}

export default postService;
