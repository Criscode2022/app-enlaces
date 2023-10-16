### APP-ENLACES


## Descripción:


Esta aplicación ofrece al usuario el acceso, previo registro siempre, a una plataforma en la que se comparten enlaces de interés. El usuario puede publicar sus propios enlaces y seguir los de los demás, señalando cuáles les han gustado con un botón de like.
La aplicación no contempla usuarios anónimos: todos deben registrarse para poder acceder a la plataforma. El registro consta de 3 campos: una imagen de avatar (opcional), un nombre de usuario y una contraseña (obligatorios). Estos campos podrán ser modificados previamente. El usuario podrá acceder a todo el listado de enlaces publicados. Para publicar sus propios enlaces, interacturará con un formulario de creación de post en el que llenará los campos de la URL del enlace, un título y una breve descripción de su publicación y una imagen (opcional).


## Pasos para arrancar el proyecto:

- Crear una base de datos vacía en una instancia de MySQL local.
- Guardar el archivo '.env.example' como '.env' y cubrir los datos necesarios.
- Ejecutar el script SQL ('./documentation/script-BBDD.sql') en la base de datos vacía para inicializarla.
- Ejecutar el comando 'npm i' en consola para instalar las dependencias necesarias.
- Arrancar el servidor.


## Entidades:

users:
- id_user **PK**
- name_user 
- password_
- following_user 
- biography_user 
- avatar_user 
- created_at 

posts:
- id_post **PK**
- id_user **FK**
- post_img 
- post_url 
- post_title 
- post_description 
- created_at 

likes:
- id_like **PK**
- id_user **FK** 
- id_post **FK**

follows:
- id_follow **PK**
- id_user **FK**
- id_user_following **FK**


## Lista de endpoints:

Colección de Postman: https://www.postman.com/galactic-zodiac-661739/workspace/hack-a-boss-workspace/request/26642606-6ffd55aa-07ea-489a-b0e9-9a5ff182d449

Rutas de publicaciones (todas requieren autenticación):
- GET /posts => Obtener todos los enlaces publicados.
- GET /posts/likes => Obtener todos los enlaces con like.
- POST /posts/like/:postId => Dar like a una publicación.
- POST /posts/newPost => Crear nueva publicación.
- DELETE /posts/unlike/:postId => Eliminar el like de una publicación.
- DELETE /posts/:postId => Eliminar publicación.
  
Rutas de usuario:
- GET /users/checkfollow/:userFollow => Comprobar si se sigue a un usuario (requiere autenticación).
- GET /users/following => Obtener usuarios que se siguen (requiere autenticación).
- GET /users/:userId => Obtener la información de un usuario por su id (requiere autenticación).
- POST /users/register => Registro de usuario.
- POST /users/login => Logueo de usuario.
- POST /users/follow/:userFollow => Seguir a un usuario (requiere autenticación).
- PUT /users/update => actualizar perfil de usuario (requiere autenticación).
- DELETE /users/unfollow/:userUnfollow => Dejar de seguir a un usuario (requiere autenticación).
