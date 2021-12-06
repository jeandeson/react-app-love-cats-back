import { createRequire } from "module";
import jwt from "jsonwebtoken";
const require = createRequire(import.meta.url);
const authConfig = require("../../config/auth.json");

const midlewares = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }

  const token = authHeader.replace("Bearer", "").replace(" ", "");

  jwt.verify(token, authConfig.secrete, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Invalid Token" });
    }
    req.userId = decoded.id;
    return next();
  });
};

export default midlewares;
