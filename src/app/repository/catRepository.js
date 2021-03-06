import Connection from "../../database/connection.js";

const connection = new Connection();
export default class CatRepository {
  async getAll() {
    try {
      const conn = await connection.connect();
      const [rows] = await conn.query(`SELECT * FROM tb_cats`);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async getById(id) {
    try {
      const conn = await connection.connect();
      const query = `SELECT * FROM tb_cats where user_id = ?`;
      const values = [parseInt(id)];
      const [rows] = await conn.query(query, values);
      await conn.end();
      return rows;
    } catch (error) {
      throw error.message;
    }
  }

  async post(cat) {
    try {
      const conn = await connection.connect();
      const query = "insert into tb_cats (cat_name, cat_image, color, genere, user_id) values (?, ?, ?, ?, ?)";
      const values = [cat.catName, cat.image, cat.color, cat.genere, cat.user_id];
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
