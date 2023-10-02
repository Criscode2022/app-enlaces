import { useState } from "react";

function LinkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Función para manejar el envío del formulario
  function handleSubmit(event) {
    event.preventDefault();
    const data = { title, url };

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

  return (
    <div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={handleUrlChange}
        />
        <button type="submit">Crear Enlace</button>
      </form>
    </div>
  );
}

export default LinkForm;
