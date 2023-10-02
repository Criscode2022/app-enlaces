import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function LinkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Función para manejar el envío del formulario
  function handleSubmit(event) {
    event.preventDefault();
    const data = { title, url, description, username };

    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo crear el enlace");
        }
        return response.json();
      })
      .then(() => {
        // Manejar la respuesta del servidor aquí
        setSuccessMessage("Enlace creado exitosamente");
        setErrorMessage(""); // Limpiar cualquier mensaje de error previo
      })
      .catch((error) => {
        // Manejar errores de la solicitud aquí
        setSuccessMessage(""); // Limpiar cualquier mensaje de éxito previo
        setErrorMessage(error.message || "Hubo un error al crear el enlace");
      });
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

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  return (
    <div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
        <TextField
          required
          label="Nombre de Usuario"
          value={username}
          onChange={handleUsernameChange}
        />
        <Button variant="contained" type="submit">Crear Enlace</Button>
      </form>
    </div>
  );
}

export default LinkForm;
