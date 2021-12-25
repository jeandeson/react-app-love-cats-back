import Connection from "../../database/connection.js";

const connection = new Connection();

export default class AuthRepository {
  async register(user) {
    try {
      const conn = await connection.connect();
      const query = "insert into tb_users (email, user_name, user_image, password) values (?, ?, ?, ?);";
      const values = [user.email, user.name, user.image, user.password];
      const rows = await conn.query(query, values);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async registerCat(userId, cat) {
    try {
      console.log(cat);
      const conn = await connection.connect();
      const query = "insert into tb_cats (cat_name, cat_image, color, genere, user_id) values (?, ?, ?, ?, ?);";
      const values = [cat.catName, cat.image, cat.color, cat.genere, userId];
      const rows = await conn.query(query, values);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async login(user) {
    try {
      const conn = await connection.connect();
      const query =
        "select u.id, u.email, u.user_name, u.user_image, u.password, c.cat_name, c.color, c.genere, c.cat_image, c.user_id from tb_users u left join tb_cats c on u.id = c.user_id  where email = ? ";
      const values = [user.email];
      const rows = await conn.query(query, values);
      await conn.end();
      return rows;
    } catch (error) {
      console.log(error);
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
      await conn.end();
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
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }
}
