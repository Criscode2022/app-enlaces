import "../../App.css";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function EditarPerfilForm() {
  const [formData, setFormData] = useState({
    username: "",
    biography: "",
    avatar: "",
    newPassword: "",
  });

  const auth = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, password } = formData;
      await auth.login(username, password);
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in: " + error.message);
    }
  };

  if (auth.token) {
    return <Navigate to="/feed" />;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Nombre:</label>
        <input
          type="text"
          onChange={handleChange}
          id="username"
          value={formData.username}
        />
      </div>
      <div>
        <label htmlFor="biography">biography:</label>
        <input
          type="text"
          onChange={handleChange}
          id="biography"
          value={formData.biography}
        />
      </div>
      <div>
        <label htmlFor="avatar">Avatar:</label>
        <input
          type="text"
          onChange={handleChange}
          id="avatar"
          value={formData.avatar}
        />
      </div>
      <div>
        <label htmlFor="newPassword">newPassword:</label>
        <input
          type="password"
          onChange={handleChange}
          id="newPassword"
          value={formData.newPassword}
        />
      </div>
      <button type="submit">Guardar Cambios</button>
    </form>
  );
}

export default EditarPerfilForm;
