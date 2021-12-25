import Connection from "../../database/connection.js";

const connection = new Connection();
export default class LikeRepository {
  async getAll(post_id) {
    try {
      const conn = await connection.connect();
      const [rows] = await conn.query(`SELECT * FROM tb_likes where post_id = ${parseInt(post_id)}`);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async getById(id) {
    try {
      const conn = await connection.connect();
      const query = `SELECT * FROM tb_likes where post_id = ?`;
      const values = [parseInt(id)];
      const [rows] = await conn.query(query, values);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async post(body) {
    try {
      const conn = await connection.connect();
      const query = "insert into tb_likes (user_id, post_id) values (?, ?)";
      const values = [body.user_id, body.post_id];
      const rows = await conn.query(query, values);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async update(id, cat) {
    try {
      const conn = await connection.connect();
      const query = "update tb_cats set cat_name = ?, cat_image = ?,  color = ?, genere = ? where id = ?";
      const values = [cat.catName, cat.cat_image, cat.color, cat.genere, parseInt(id)];
      const rows = await conn.query(query, values);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async delete(id) {
    try {
      const conn = await connection.connect();
      const query = "delete from tb_likes where id = ?";
      const values = [parseInt(id)];
      const rows = await conn.query(query, values);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }
}
