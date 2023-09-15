DROP DATABASE IF EXISTS enlaces;
CREATE DATABASE enlaces;
USE enlaces;

-- Crear tabla de Users --

CREATE TABLE users (
  id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name_user varchar(50) NOT NULL UNIQUE,
  password_user varchar(20) NOT NULL,
  avatar_user BLOB,
  biography_user varchar(200),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de Posts --

CREATE TABLE posts (
  id_post INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_user INT NOT NULL,
  post_url varchar(300) NOT NULL,
  post_title varchar(30) NOT NULL,
  post_description varchar(200) NOT NULL,
  post_likes INT DEFAULT(0),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users (id_user)
);

-- Inserts --

INSERT INTO users (name_user, password_user) values ('Juan', '1234');
INSERT INTO users (name_user, password_user) values ('Ana', '1fdf234');
INSERT INTO users (name_user, password_user) values ('Carlos', 'gdfgdfvb');
INSERT INTO users (name_user, password_user) values ('Marta', 'sfdsfsdf');
INSERT INTO users (name_user, password_user) values ('Julio', 'fsdfdsfsd564');

INSERT INTO posts (post_url, post_title, id_user, post_description) values ('Google.com', 'Google', 1, 'Enlace de Google');
INSERT INTO posts (post_url, post_title, id_user, post_description) values ('Twiter.com', 'Twitter', 3, 'Enlace de Twitter');
INSERT INTO posts (post_url, post_title, id_user, post_description) values ('https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Gato', 2, 'Foto de gato');
INSERT INTO posts (post_url, post_title, id_user, post_description) values ('youtube.com', 'YouTube', 1, 'Enlace de Youtube');


-- Ver todos los usuarios --

select * from users;

-- Ver todos los posts --

select * from posts;

-- Ver posts con su usuario --

select post_url, post_title, post_description, name_user, posts.created_at, post_likes
 from posts 
 join users 
 on posts.id_user = users.id_user;

-- Buscar posts por id de usuario --

select post_url, post_title, post_description, name_user, posts.created_at, post_likes
 from posts
 join users on posts.id_user = users.id_user
 where posts.id_user = 1;

-- Buscar posts por nombre de usuario --

select post_url, post_title, post_description, name_user, posts.created_at, post_likes
from posts 
join users on posts.id_user = users.id_user
where users.name_user LIKE 'Juan';

-- Buscar posts por palabra clave --

select post_url, post_title, post_description, name_user, posts.created_at, post_likes
from posts 
join users on posts.id_user = users.id_user
where post_description LIKE '%gato%'  or post_title LIKE '%gato%';






