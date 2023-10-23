import "../../App.css";
import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function UpdateForm() {
  const [formData, setFormData] = useState({
    username: "",
    biography: "",
    avatar: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    biography: "",
    avatar: "",
    newPassword: "",
  });

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Limpiar el mensaje de error del campo actual
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:3000/users/update";
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, requestOptions);
      const jsonResponse = await response.json();

      if (response.status === 400) {
        // Si la respuesta tiene un estado 400 (Bad Request), maneja los errores
        setErrors({
          username: jsonResponse.fields.includes("username")
            ? jsonResponse.error
            : "",
          biography: jsonResponse.fields.includes("biography")
            ? jsonResponse.error
            : "",
          avatar: jsonResponse.fields.includes("avatar")
            ? jsonResponse.error
            : "",
          newPassword: jsonResponse.fields.includes("newPassword")
            ? jsonResponse.error
            : "",
        });
      } else if (!response.ok) {
        throw new Error(jsonResponse.message);
      } else {
        // Limpia los mensajes de error de todos los campos en caso de éxito
        setErrors({
          username: "",
          biography: "",
          avatar: "",
          newPassword: "",
        });
        await auth.logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        label="Nombre de usuario"
        onChange={handleChange}
        id="username"
        name="username"
        value={formData.username}
        helperText={errors.username}
        error={Boolean(errors.username)}
      />
      <TextField
        type="text"
        label="Biografía"
        onChange={handleChange}
        id="biography"
        name="biography"
        value={formData.biography}
        helperText={errors.biography}
        error={Boolean(errors.biography)}
      />
      <TextField
        type="text"
        label="URL de avatar"
        onChange={handleChange}
        id="avatar"
        name="avatar"
        value={formData.avatar}
        helperText={errors.avatar}
        error={Boolean(errors.avatar)}
      />
      <TextField
        type="password"
        label="Nueva contraseña"
        onChange={handleChange}
        id="newPassword"
        name="newPassword"
        value={formData.newPassword}
        helperText={errors.newPassword}
        error={Boolean(errors.newPassword)}
      />
      <Button type="submit" variant="contained">
        Actualizar perfil
      </Button>
    </form>
  );
}

export default UpdateForm;
