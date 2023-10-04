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
  function handleSubmit() {
    alert ("Enlace creado correctamente");

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
    <div className="container">
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
        <Button variant="contained" type="submit">Crear Enlace</Button>
      </form>
    </div>
  );
}

export default LinkForm;
