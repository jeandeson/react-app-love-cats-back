import Connection from "../../database/connection.js";

const connection = new Connection();
class PostRepository {
  async getAll(id) {
    try {
      parseInt(id);
      const conn = await connection.connect();
      const [rows] = await conn.query(
        `select id, content, DATE_FORMAT(created_at, '%d/%m/%Y %H:%i') as created_at, user_id from tb_posts where user_id = ${id} or user_id in (SELECT followed_id from tb_follows where user_id = ${id}) ORDER BY id DESC`
      );
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async getById(id) {
    try {
      const conn = await connection.connect();
      const [rows] = await conn.query(
        "select id, content, DATE_FORMAT(created_at, '%d/%m/%Y %H:%i') as created_at, user_id from tb_posts where id = " +
          parseInt(id)
      );
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async post(post) {
    try {
      const conn = await connection.connect();
      const query = "insert into tb_posts (user_id, content) values (?, ?)";
      const values = [post.user_id, post.content];
      const rows = await conn.query(query, values);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }
}
export default PostRepository;
