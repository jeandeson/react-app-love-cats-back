import Connection from "../../database/connection.js";

const connection = new Connection();
export default class ActionRepository {
  async follow(body) {
    try {
      const conn = await connection.connect();
      const query = "insert into tb_follows (user_id, followed_id) values (?, ?)";
      const values = [body.user_id, body.followed_id];
      const rows = await conn.query(query, values);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async verifyFollow(body) {
    try {
      const conn = await connection.connect();
      const query = "select * from tb_follows where user_id = ? and followed_id = ?";
      const values = [body.user_id, body.followed_id];
      const [rows] = await conn.query(query, values);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async unFollow(body) {
    try {
      const conn = await connection.connect();
      const query = "delete from tb_follows where user_id = ? and followed_id = ?";
      const values = [body.user_id, body.followed_id];
      const rows = await conn.query(query, values);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }
}
