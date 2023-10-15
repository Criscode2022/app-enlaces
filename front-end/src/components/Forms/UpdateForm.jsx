import "../../App.css";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";


function UpdateForm() {
  const [formData, setFormData] = useState({
    username: "",
    biography: "",
    avatar: "",
    newPassword: "",
  });

  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

      if (response.ok) {
        // Request was successful, handle the response as needed
        console.log("Profile updated successfully");
      } else {
        // Request failed, handle the error
        console.error("Error updating profile");
        alert("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile: " + error.message);
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
      />
      <TextField
        type="text"
        label="Biografía"
        onChange={handleChange}
        id="biography"
        name="biography"
        value={formData.biography}
      />
      <TextField
        type="text"
        label="URL de avatar"
        onChange={handleChange}
        id="avatar"
        name="avatar"
        value={formData.avatar}
      />
      <TextField
        type="password"
        label="Nueva contraseña"
        onChange={handleChange}
        id="newPassword"
        name="newPassword"
        value={formData.newPassword}
      />
      <Button type="submit" variant="contained">Actualizar perfil</Button>
    </form>
  );
}

export default UpdateForm;
