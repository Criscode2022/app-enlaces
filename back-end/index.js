"use strict";

require("dotenv").config();
const getLinksController = require("./controllers/getLinksController");
const getBiography = require("./controllers/getBiography");
const updateBiography = require("./controllers/updateBiography");
// Importaciones usando CommonJS
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("This server is now live!");
}); // Ruta para mostrar un mensaje en la raíz del servidor

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/links", getLinksController);
app.use("/biography", getBiography);
app.use("/changes", updateBiography);

/*app.use("/users", (req, res, next) => {
  const [results] = pool.query("SELECT * FROM users");
  res.send({
    ok: true,
    data: results,
    error: null,
    message: null,
  });
}); */

//Middleware de errores, devuelve una respuesta de error adecuada y maneja la situación de manera controlada.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
