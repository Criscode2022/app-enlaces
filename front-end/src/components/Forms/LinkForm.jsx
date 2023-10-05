import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function LinkForm({ id_user }) {
  const [linkData, setLinkData] = useState({
    title: "",
    url: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLinkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...linkData, id_user };

    // Obtener el token del almacenamiento local (simulado)
    const token = window.localStorage.getItem("login-token");

    console.log("Datos del formulario:", data); // Verificar los datos del formulario
    console.log("Token de autenticación:", token); // Verificar el token

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
          name="title"
          value={linkData.title}
          onChange={handleInputChange}
        />
        <TextField
          required
          label="URL"
          name="url"
          value={linkData.url}
          onChange={handleInputChange}
        />
        <TextField
          required
          label="Descripción"
          name="description"
          value={linkData.description}
          onChange={handleInputChange}
        />
        <Button type="submit">Crear Enlace</Button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default LinkForm;
