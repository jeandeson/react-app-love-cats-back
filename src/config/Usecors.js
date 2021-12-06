import cors from "cors";
import express from "express";

const useCors = (req, res, next) => {
  const app = express();
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  //Quais tipos de headers são aceitos pelo servidor
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  //Instacia principal do cors para setar as configurações
  app.use(cors());
  next();
};

export default () => useCors;
