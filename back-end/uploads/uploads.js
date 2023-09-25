const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path"); // Asegúrate de importar 'path'
const fs = require("fs");

const uploadDirectory = "uploads/";

// Verificar si la carpeta de destino existe, si no, crearla
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/"); // Ruta del directorio de almacenamiento
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB en bytes

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.size <= MAX_FILE_SIZE_BYTES) {
      // Acepta el archivo si su tamaño está dentro del límite
      callback(null, true);
    } else {
      // Rechaza el archivo si supera el tamaño máximo
      callback(new Error("Tamaño de archivo excedido"), false);
    }
  },
});

const uuid = require("uuid");

router.post("/", (req, res) => {
  upload.single("archivo")(req, res, (err) => {
    // Utiliza `upload.single('archivo')` en lugar de `upload(req, res)`
    if (err) {
      console.error("Error de validación:", err.message);
      return res.status(400).json({ status: "error", message: err.message });
    }

    // Genera un nombre de archivo único y seguro
    const archivo = req.file;
    const nombrePersonalizado = req.body.nombre || uuid.v4(); // Usar UUID como nombre si no se proporciona uno

    // Concatena el nombre personalizado con la extensión del archivo
    const nombreArchivo =
      nombrePersonalizado + path.extname(archivo.originalname);

    console.log("Archivo cargado:", nombreArchivo);
    res.send("Archivo cargado con éxito");
  });
});

module.exports = router;
