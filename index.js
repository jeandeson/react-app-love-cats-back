import express from "express";
import bodyParser from "body-parser";
import router from "./src/controllers/produtoController.js";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);
app.use("/api", router);

app.listen(3000, () => {
  console.log("servidor funcionando");
});
