const express = require("express");
const nunjucks = require("nunjucks");
const expressFileUpload = require("express-fileupload");
const fs = require("fs").promises;
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("static"));

app.use(bodyParser.urlencoded({ extended: true }));

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
  res.redirect("/imagen");
});

app.get("/imagen", (req, res) => {
  res.render("formulario.html");
});

app.post("/imagen", async (req, res) => {
  const data = req.files.target_file.data;
  const posicion = req.body.posicion;

  await fs.writeFile(`static/imgs/imagen-${posicion}.jpg`, data);
  res.redirect("/collage");
});

app.get("/collage", (req, res) => {
  res.render("collage.html");
});

app.get("/deleteImg/:img", async (req, res) => {
  const img = req.params.img;
  await fs.unlink(`static/imgs/${img}`);
  res.redirect("/collage");
});

app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});
