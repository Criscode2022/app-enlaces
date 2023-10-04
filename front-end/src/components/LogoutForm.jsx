import React from "react";
import Button from "@mui/material/Button";

function handleLogout() {
  // Elimina el token de autenticación del almacenamiento local
  localStorage.removeItem("login-token");
  // Redirige al usuario a la página de inicio de sesión (o cualquier otra página deseada)
  window.location.href = "/login"; // Cambia '/login' por la URL adecuada
}

const LogoutButton = () => {
  // Verifica si el token de autenticación está presente en el almacenamiento local
  const isAuthenticated = !!localStorage.getItem("login-token");

  // Renderiza el botón solo si el usuario está autenticado
  return (
    <div>
      {isAuthenticated && (
        <Button variant="contained" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      )}
    </div>
  );
};

export default LogoutButton;
