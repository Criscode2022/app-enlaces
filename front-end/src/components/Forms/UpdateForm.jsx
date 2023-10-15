import "../../App.css";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


function UpdateForm() {
  const [formData, setFormData] = useState({
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.update(formData);
      toast.success("Perfil actualizado correctamente", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Error updating profile", {
        position: toast.POSITION.TOP_CENTER
      })
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
