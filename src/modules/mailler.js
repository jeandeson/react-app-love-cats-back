import mailer from "nodemailer";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mailConfig = require("../config/mail.json");

import hbs from "nodemailer-express-handlebars";

// const transport = mailer.createTransport({
//   host: mailConfig.host,
//   port: mailConfig.port,
//   auth: {
//     user: mailConfig.auth.user,
//     pass: mailConfig.auth.pass,
//   },
// });
const transport = mailer.createTransport({
  service: "gmail",
  auth: {
    user: "jeandesonteste@gmail.com",
    pass: "plinhomisere",
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".html",
    partialsDir: path.resolve("./src/resources/mail"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./src/resources/mail"),
  extName: ".html",
};

transport.use("compile", hbs(handlebarOptions));

export default transport;
