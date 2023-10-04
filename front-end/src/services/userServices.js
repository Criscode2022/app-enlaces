// Función que registra a un usuario.
export const registerService = async (username, password) => {
    const response = await fetch(`http://localhost:3000/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username, 
        password
      }),
    });

    const json = await response.json();

    // Si hay un error lo mostramos. Dado que esta parte no esta correctamente implementada en el backend, vamos a simular el error.
    if (json.error) {
        alert('Ha habido un error al loguear el usuario');
    }
}

// Función que loguea a un usuario.
export const loginService = async (username, password) => {
    const response = await fetch(`http://localhost:3000/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username, 
        password
      }),
    });

    const json = await response.json();

    // Si hay un error lo mostramos. Dado que esta parte no esta correctamente implementada en el backend, vamos a simular el error.
    if (json.error) {
        alert('Ha habido un error al loguear el usuario');
    }

    // Retornamos el token.
    return json.token;
}

// Función que obtiene los datos de un usuario.
export const getUserService = async (token) => {
    const response = await fetch(`http://localhost:3000/users/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const json = await response.json();

    // Si hay un error lo mostramos. Dado que esta parte no esta correctamente implementada en el backend, vamos a simular el error.
    if (json.error) {
        alert('Ha habido un error al obtener los datos del usuario');
    }

    // Retornamos los datos del usuario.
    return json.user;
}