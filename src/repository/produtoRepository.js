import Connection from "../database/connection.js";

const connection = new Connection();

export default class ProdutoRepository {
  async getAll() {
    try {
      const conn = await connection.connect();
      const [rows] = await conn.query(`SELECT id, descricao, preco FROM tb_produtos;`);
      return rows;
    } catch (error) {
      console.log("erro ao obter dados do banco");
    }
  }

  async getById(id) {
    try {
      const conn = await connection.connect();
      const [rows] = await conn.query(`SELECT id, descricao, preco FROM tb_produtos where id = ${id};`);
      return rows;
    } catch (error) {
      console.log("erro ao obter dados do banco");
    }
  }

  async post(produto) {
    try {
      const conn = await connection.connect();
      const query = "insert into tb_produtos (descricao, preco) values (?, ?);";
      const values = [produto.descricao, produto.preco];
      const rows = await conn.query(query, values);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  async put(produto, id) {
    try {
      const conn = await connection.connect();
      const query = "update tb_produtos set descricao = ?, preco = ? where id = ?;";
      const values = [produto.descricao, produto.preco, parseInt(id)];
      const rows = await conn.query(query, values);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const conn = await connection.connect();
      const query = "delete from tb_produtos where id = ?;";
      const values = [id];
      const rows = await conn.query(query, values);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}
