import Connection from "../../database/connection.js";

const connection = new Connection();
export default class UserRepository {
  async getAll(name = null, id = null) {
    try {
      const conn = await connection.connect();
      if (name != null) {
        const query = "SELECT id, user_name, user_image FROM tb_users where user_name like ? and id != ?";
        const values = [`${name}%`, parseInt(id)];
        const [rows] = await conn.query(query, values);
        await conn.end();
        return rows;
      }
      const [rows] = await conn.query("SELECT id, user_name, email FROM tb_users");
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async getById(id) {
    try {
      const conn = await connection.connect();
      const [rows] = await conn.query(`SELECT id, user_image, user_name from tb_users where id = ${parseInt(id)};`);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async update(id, user) {
    try {
      const conn = await connection.connect();
      const query = "update tb_users set password = ?, pass_reset_expires = ?, pass_reset_token = ? where id = ?";
      const values = [user.password, user.pass_reset_expires, user.pass_reset_token, parseInt(id)];
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
      const query = "delete from tb_users where id = ?";
      const values = [id];
      const rows = await conn.query(query, values);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }
}
