DROP DATABASE IF EXISTS enlaces;
CREATE DATABASE enlaces;
USE enlaces;

-- Crear tabla de Users --

CREATE TABLE users (
  id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name_user varchar(50) NOT NULL UNIQUE,
  password_user varchar(20) NOT NULL,
  biography_user tinytext,
  avatar_user BLOB,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de Posts --

CREATE TABLE posts (
  id_post INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_user INT NOT NULL,
  post_url varchar(300) NOT NULL,
  post_title varchar(30) NOT NULL,
  post_description varchar(200) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users (id_user)
);

create table likes (
id_like INT auto_increment primary key,
id_user INT NOT NULL,
id_post INT NOT NULL,
FOREIGN KEY (id_user) REFERENCES users (id_user),
FOREIGN KEY (id_post) REFERENCES posts (id_post),
UNIQUE KEY unique_user_post (id_user, id_post)

);

-- Inserts --

INSERT INTO users (name_user, password_user, biography_user) values ('Juan', '1234', 'Estudiante de Informática');
INSERT INTO users (name_user, password_user, biography_user) values ('Ana', '1fdf234', 'Guitarrista profesional');
INSERT INTO users (name_user, password_user, biography_user) values ('Carlos', 'gdfgdfvb', 'Jugador de baloncesto');
INSERT INTO users (name_user, password_user, biography_user) values ('Marta', 'sfdsfsdf', 'Profesora universitaria');
INSERT INTO users (name_user, password_user, biography_user) values ('Julio', 'fsdfdsfsd564', 'Camarero de restaurante');

INSERT INTO posts (post_url, post_title, id_user, post_description) values ('Google.com', 'Google', 1, 'Enlace de Google');
INSERT INTO posts (post_url, post_title, id_user, post_description) values ('Twiter.com', 'Twitter', 3, 'Enlace de Twitter');
INSERT INTO posts (post_url, post_title, id_user, post_description) values ('https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Gato', 2, 'Foto de gato');
INSERT INTO posts (post_url, post_title, id_user, post_description) values ('youtube.com', 'YouTube', 1, 'Enlace de Youtube');

INSERT INTO likes (id_user, id_post) values (1, 2);
INSERT INTO likes (id_user, id_post) values (1, 3);
INSERT INTO likes (id_user, id_post) values (1, 4);
INSERT INTO likes (id_user, id_post) values (2, 2);
INSERT INTO likes (id_user, id_post) values (2, 3);
INSERT INTO likes (id_user, id_post) values (3, 2);
INSERT INTO likes (id_user, id_post) values (3, 3);



-- Ver todos los usuarios --

select * from users;

-- Ver todos los posts --

select * from posts;

-- Ver posts con su usuario --

select post_url, post_title, post_description, name_user, posts.created_at
 from posts 
 join users 
 on posts.id_user = users.id_user;

-- Buscar posts por id de usuario --

select post_url, post_title, post_description, name_user, posts.created_at
 from posts
 join users on posts.id_user = users.id_user
 where posts.id_user = 1;

-- Buscar posts por nombre de usuario --

select post_url, post_title, post_description, name_user, posts.created_at
from posts 
join users on posts.id_user = users.id_user
where users.name_user LIKE 'Juan';

-- Buscar posts por palabra clave --

select post_url, post_title, post_description, name_user, posts.created_at
from posts 
join users on posts.id_user = users.id_user
where post_description LIKE '%gato%'  or post_title LIKE '%gato%';

-- Buscar todos los likes --

select * from likes;

-- Contar los likes de un post --

SELECT p.id_post, p.post_title, COUNT(l.id_like) AS like_count
FROM posts p
INNER JOIN likes l ON p.id_post = l.id_post
GROUP BY p.id_post, p.post_title;


