import { useState } from "react";

function EditarPerfilForm() {
  const [username, setUsername] = useState("");
  const [biography, setBiography] = useState("");
  const [avatar, setAvatar] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Nombre:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="biography">biography:</label>
        <input
          type="text"
          id="biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="avatar">Avatar:</label>
        <input
          type="text"
          id="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword">newPassword:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setnewPassword(e.target.value)}
        />
      </div>
      <button type="submit">Guardar Cambios</button>
    </form>
  );
}

export default EditarPerfilForm;
