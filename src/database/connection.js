import mysql from "mysql2/promise";
import config from "../config/config.js";

export default class Connection {
  async connect() {
    try {
      const connection = await mysql.createConnection(config);
      console.log("Conectou no MySQL!");
      return connection;
    } catch (error) {
      console.log("erro ao conctar no banco");
    }
  }
}
