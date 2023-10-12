import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewPostForm() {
  // Obtener el token del Local Storage
  const token = window.localStorage.getItem("authToken");

  const [postData, setpostData] = useState({
    url: "",
    titulo: "",
    descripcion: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setpostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Datos del formulario a enviar:", postData); // Verificar los datos del formulario que estás enviando
      console.log("Token de autenticación:", token); // Verificar el token

      const response = await fetch(`http://localhost:3000/posts/newPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Adjuntar el token en el encabezado de la solicitud
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData), // Envía el objeto postData sin el userId
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "No se pudo crear el enlace");
      }

      const responseData = await response.json();
      // Manejar la respuesta del servidor aquí, si es necesario.

      console.log("Respuesta del servidor:", responseData); // Verificar la respuesta del servidor

      toast.success("Enlace creado correctamente", {
        position: toast.POSITION.TOP_CENTER
      })
    } catch (error) {
      console.error("Error al crear el enlace:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="Título"
          name="titulo"
          value={postData.titulo}
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
          value={postData.descripcion}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained">Crear Enlace</Button>
      </form>

      <ToastContainer />

    </>
  );
}

export default NewPostForm;

