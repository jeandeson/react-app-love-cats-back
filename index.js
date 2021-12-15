import express from "express";
import bodyParser from "body-parser";
import cors from "./src/config/cors.js";
import index from "./src/app/controllers/index.js";

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", index());

app.listen(3000, () => {
  console.log("servidor funcionando na porta 3000");
});
