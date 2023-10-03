import React, { useState } from "react";

function UserProfileUpdate() {
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    // Otros campos de perfil aquí
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Agrega aquí la lógica de validación según tus necesidades
    // Ejemplo de validación simple:
    if (!userProfile.username || !userProfile.email) {
      setErrorMessage("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Simula una solicitud de actualización al servidor (reemplázalo con tu lógica real)
    setTimeout(() => {
      // Supongamos que la respuesta del servidor indica éxito
      const serverResponse = { success: true };

      if (serverResponse.success) {
        setSuccessMessage("Perfil actualizado con éxito");
        setErrorMessage(""); // Limpia el mensaje de error si había uno previamente
      } else {
        setErrorMessage("Error al actualizar el perfil");
        setSuccessMessage(""); // Limpia el mensaje de éxito si había uno previamente
      }
    }, 1000); // Simulación de una solicitud al servidor
  };

  return (
    <div>
      <h2>Actualizar perfil de usuario</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userProfile.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userProfile.email}
            onChange={handleInputChange}
          />
        </div>
        {/* Agrega otros campos de perfil aquí */}
        <button type="submit">Actualizar perfil</button>
      </form>
    </div>
  );
}

export default UserProfileUpdate;
