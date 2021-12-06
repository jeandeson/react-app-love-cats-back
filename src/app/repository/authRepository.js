import Connection from "../../database/connection.js";

const connection = new Connection();

export default class AuthRepository {
  async register(user) {
    try {
      const conn = await connection.connect();
      const query = "insert into tb_users (email, user_name, password) values (?, ?, ?);";
      const values = [user.email, user.name, user.password];
      const rows = await conn.query(query, values);
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async login(user) {
    try {
      const conn = await connection.connect();
      const query = "select id, email, user_name, password from tb_users where email = ?";
      const values = [user.email];
      const rows = await conn.query(query, values);
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async forgot(email) {
    try {
      const conn = await connection.connect();
      const query =
        "select id, email, user_name, pass_reset_token, pass_reset_expires, password from tb_users where email = ?";
      const values = [email];
      const rows = await conn.query(query, values);
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async updateUserToken(id, pass_reset_expires, pass_reset_token) {
    try {
      const conn = await connection.connect();
      const query = "update tb_users set pass_reset_expires = ?, pass_reset_token = ? where id = ?";
      const values = [pass_reset_expires, pass_reset_token, parseInt(id)];
      const rows = await conn.query(query, values);
      return rows;
    } catch (error) {
      throw error.message;
    }
  }
}
