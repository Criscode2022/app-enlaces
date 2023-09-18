"use strict";

require("dotenv").config();

// Importaciones usando CommonJS
const express = require("express");
const session = require("express-session");
const app = express();

app.get("/", (req, res) => {
  res.send("This server is now live!");
}); // Ruta para mostrar un mensaje en la raíz del servidor

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Endpoint para acceder a todos los enlances publicados:
app.use("/posts", require("./controllers/postsController"));

app.use(
  session({
    secret: process.env.SESSION_COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/users", require("./controllers/usersController"));
app.use("/update-biography", require("./controllers/updatesUsers"));
app.use("/update-avatar", require("./controllers/updatesUsers"));
app.use("/change-name", require("./controllers/updatesUsers"));
app.use("/change-password", require("./controllers/updatesUsers"));

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
