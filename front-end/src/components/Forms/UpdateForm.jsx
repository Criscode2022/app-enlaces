import "../../App.css";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function UpdateForm() {
  const [formData, setFormData] = useState({
    username: "",
    biography: "",
    avatar: "",
    newPassword: "",
  });

  const { token } = useContext(AuthContext);

  const auth = useContext(AuthContext);

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
      <div>
        <label htmlFor="username">Nombre:</label>
        <input
          type="text"
          onChange={handleChange}
          id="username"
          name="username"
          value={formData.username}
        />
      </div>
      <div>
        <label htmlFor="biography">Biografía:</label>
        <input
          type="text"
          onChange={handleChange}
          id="biography"
          name="biography"
          value={formData.biography}
        />
      </div>
      <div>
        <label htmlFor="avatar">Avatar:</label>
        <input
          type="text"
          onChange={handleChange}
          id="avatar"
          name="avatar"
          value={formData.avatar}
        />
      </div>
      <div>
        <label htmlFor="newPassword">Nueva Contraseña:</label>
        <input
          type="password"
          onChange={handleChange}
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
        />
      </div>
      <button type="submit">Guardar Cambios</button>
    </form>
  );
}

export default UpdateForm;
