import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function LinkForm({ id_user }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Función para manejar el envío del formulario
  async function handleSubmit(event) {
    event.preventDefault();
    const data = { title, url, description, id_user }; // Incluir el id_user en los datos

    // Obtener el token del almacenamiento local
    const token = window.localStorage.getItem("login-token");

    console.log("Datos del formulario:", data); // Agregado para verificar los datos del formulario
    console.log("Token de autenticación:", token); // Agregado para verificar el token

    try {
      const response = await fetch(`http://localhost:3000/users/posts`, {
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

      //const responseData = await response.json();
      // Manejar la respuesta del servidor aquí, si es necesario.

      setSuccessMessage("Enlace creado exitosamente");
      setErrorMessage(""); // Limpiar cualquier mensaje de error previo
    } catch (error) {
      // Manejar errores de la solicitud aquí
      console.error("Error al crear el enlace:", error);
      setSuccessMessage(""); // Limpiar cualquier mensaje de éxito previo
      setErrorMessage(error.message || "Hubo un error al crear el enlace");
    }
  }

  // Funciones para manejar cambios en los campos del formulario
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleUrlChange(event) {
    setUrl(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="Título"
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          required
          label="URL"
          value={url}
          onChange={handleUrlChange}
        />
        <TextField
          required
          label="Descripción"
          value={description}
          onChange={handleDescriptionChange}
        />
        <Button type="submit">Crear Enlace</Button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default LinkForm;
