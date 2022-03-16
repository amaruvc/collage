const express = require("express");
const nunjucks = require("nunjucks");
const expressFileUpload = require("express-fileupload");
const e = require("express");

const app = express();
app.use(express.static("static"));

app.use(
  expressFileUpload({
    limits: { fileSize: 5242880 },
    abortOnLimit: true,
    responseOnLimit: "El archivo ingresado excede el peso máximo (5mb)",
  })
);

nunjucks.configure("templates", {
  express: app,
  autoescape: true,
  watch: true,
});

app.get("/", (req, res) => {
  res.render("index.html", { frutas });
});

app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});
