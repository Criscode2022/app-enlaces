import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function NewPostForm({ id_user }) {

  const [postData, setpostData] = useState({
    url: "",
    titulo: "",
    descripcion: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setpostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...postData, id_user };

    // Obtener el token del almacenamiento local (simulado)
    const token = window.localStorage.getItem("authToken");

    console.log("Datos del formulario:", data); // Verificar los datos del formulario
    console.log("Token de autenticación:", token); // Verificar el token

    try {
      const response = await fetch(`http://localhost:3000/posts/newPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Adjuntar el token en el encabezado de la solicitud
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("No se pudo crear el enlace");
      }

      const responseData = await response.json();
      // Manejar la respuesta del servidor aquí, si es necesario.

      setSuccessMessage("Enlace creado exitosamente");
      setErrorMessage(""); // Limpiar cualquier mensaje de error previo
    } catch (error) {
      // Manejar errores de la solicitud aquí
      console.error("Error al crear el enlace:", error);
      setSuccessMessage(""); // Limpiar cualquier mensaje de éxito previo
      setErrorMessage(error.message || "Hubo un error al crear el enlace");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="Título"
          name="titulo"
          value={postData.title}
          onChange={handleInputChange}
        />
        <TextField
          required
          label="URL"
          name="url"
          value={postData.url}
          onChange={handleInputChange}
        />
        <TextField
          required
          label="Descripción"
          name="descripcion"
          value={postData.description}
          onChange={handleInputChange}
        />
        <Button type="submit">Crear Enlace</Button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default NewPostForm;
