# Simple Twitter API

Este ejercicio consiste en crear una API que simule el funcionamiento de una aplicación similar a Twitter.

## Instalar

1. Crear una base de datos vacía en una instancia de MySQL local.
2. Instalar las dependencias mediante el comando `npm install` o `npm i`.
3. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.
4. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos anteriormente creada.
5. Ejecutar `npm run dev` o `npm start` para lanzar el servidor.

## Entidades

### User

| Campo      | Tipo     | Descripción                           |
| ---------- | -------- | ------------------------------------- |
| id         | INT      | Identificador único del usuario.      |
| email      | VARCHAR  | Dirección de correo electrónico.      |
| username   | VARCHAR  | Nombre de usuario.                    |
| password   | VARCHAR  | Contraseña del usuario.               |
| avatar     | VARCHAR  | Nombre del avatar del usuario.        |
| role       | VARCHAR  | Rol del usuario (normal o admin).     |
| createdAt  | DATETIME | Fecha y hora de creación del usuario. |
| modifiedAt | DATETIME | Fecha y hora de última modificación.  |

### Tweet

| Campo     | Tipo     | Descripción                                  |
| --------- | -------- | -------------------------------------------- |
| id        | INT      | Identificador único del tweet.               |
| userId    | INT      | Identificador del usuario que creó el tweet. |
| text      | VARCHAR  | Texto del tweet.                             |
| image     | VARCHAR  | Nombre de la imagen adjunta al tweet .       |
| createdAt | DATETIME | Fecha y hora de creación del tweet.          |

### Likes

| Campo     | Tipo     | Descripción                                  |
| --------- | -------- | -------------------------------------------- |
| id        | INT      | Identificador único del like.                |
| userId    | INT      | Identificador del usuario que dio el like.   |
| tweetId   | INT      | Identificador del tweet que recibió el like. |
| createdAt | DATETIME | Fecha y hora de creación del like.           |

## Endpoints

### Usuarios:

-   POST `/users/register` - Registro de usuario.
-   POST `/users/login` - Login de usuario (devuelve token).
-   GET `/users` - Devuelve información del usuario del token.
-   PUT `/users` - Editar el email o el nombre de usuario.
-   PUT `/users/avatar` - Editar el avatar.

### Tweets:

-   POST `/tweets` - Permite crear un tweet.
-   GET `/tweets` - Lista todos los tweets.
-   GET `/tweets/:tweetId` - Devuelve información de un tweet concreto.
-   POST `/tweets/:tweetId/likes` - Añade un like a un tweet.
-   DELETE `/tweets/:tweetId/likes` - Deshace un like de un tweet.
-   DELETE `/tweets/:tweetId` - Borra un tweet solo si eres quien lo creó.