### APP-ENLACES


## Descripción:
Esta aplicación ofrece al usuario el accesso, previo registro siempre, a una plataforma en la que se comparten enlaces de interés. El usuario puede publicar sus propios enlaces y seguir los de los demás, señalando cuáles les han gustado con un botón de like.
La aplicación no contempla usuarios anónimos: todos deben registrarse para poder acceder a la plataforma. El registro consta de 3 campos: una imagen de avatar (opcional), un nombre de usuario y una contraseña (obligatorios). Estos campos podrán ser modificados previamente. El usuario podrá acceder a todo el listado de enlaces publicados. Para publicar sus propios enlaces, interacturará con una 'pop-up' en la que llenará un formulario con los campos de la URL del enlace, un título y una breve descripción de su publicación.

## Pasos para arrancar el proyecto:
La primera tarea fue implementar la estructura del servidor y la conexión a la base de datos como punto de partida. Posteriormente, se fueron añadiendo los middlewares correspondientes (parseo de body de las peticiones, gestión de errores, etc), así como la gestión de los distintos endpoints de la aplicación con los controllers de las peticiones.

## Lista de endpoints:
- /welcome : Página inicial de bienvenida para todos los usuarios, tanto registrados como no.
- /register : Página del formulario de registro para poder acceder a la plataforma.
- /login : Página de inicio de sesión de los usuarios registrados.
- /profile : Página para cambiar los datos del usuario.
- /links : Página que muestra el listado de enlaces publicados.
- /post : Pop-up que permite al usuario publicar su propio enlace de interés.
