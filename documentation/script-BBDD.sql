DROP DATABASE IF EXISTS enlaces;
CREATE DATABASE enlaces;
USE enlaces;

-- Crear tabla de Users --

CREATE TABLE users (
  id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name_user varchar(50) NOT NULL UNIQUE,
  password_user varchar(200) NOT NULL,
  biography_user tinytext,
  avatar_user varchar(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- Crear tabla de Posts --

CREATE TABLE posts (
  id_post INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_user INT NOT NULL,
  post_img varchar(300),
  post_url varchar(300) NOT NULL,
  post_title varchar(30) NOT NULL,
  post_description varchar(200) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE
);


create table likes (
id_like INT auto_increment primary key,
id_user INT NOT NULL,
id_post INT NOT NULL,
FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE,
FOREIGN KEY (id_post) REFERENCES posts (id_post) ON DELETE CASCADE,
UNIQUE KEY unique_user_post (id_user, id_post)

);


CREATE TABLE follows (
  id_follow INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT NOT NULL,
  id_user_following INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users (id_user),
  FOREIGN KEY (id_user_following) REFERENCES users (id_user),
  UNIQUE KEY unique_user_following (id_user, id_user_following),
  CHECK (id_user <> id_user_following)
);


-- Inserts --

INSERT INTO users (name_user, password_user, biography_user) values ('Juan', '1234', 'Estudiante de Informática');
INSERT INTO users (name_user, password_user, biography_user) values ('Ana', '1fdf234', 'Guitarrista profesional');
INSERT INTO users (name_user, password_user, biography_user) values ('Carlos', 'gdfgdfvb', 'Jugador de baloncesto');
INSERT INTO users (name_user, password_user, biography_user) values ('Marta', 'sfdsfsdf', 'Profesora universitaria');
INSERT INTO users (name_user, password_user, biography_user) values ('Julio', 'fsdfdsfsd564', 'Camarero de restaurante');

INSERT INTO posts (post_url, post_title, id_user, post_description, post_img) VALUES ('https://www.youtube.com/watch?v=6Jfk8ic3KVk', 'Curso de React', 1, 'Curso de React realizado por Freecodecamp en español', 'https://design-style-guide.freecodecamp.org/downloads/fcc_primary_small.jpg');
INSERT INTO posts (post_url, post_title, id_user, post_description, post_img) VALUES ('https://es.wikipedia.org/wiki/Coliseo', 'El Coliseo de Roma', 2, 'Información sobre el Coliseo de Roma en Wikipedia', 'https://media.meer.com/attachments/765ed06d8b78952fec85a1e401b67810871820fd/store/fill/1090/613/203f3e0c3169ef0b84e500deae142122017255340720775ac01f5b15af82/El-Coliseo-al-atardecer-Roma-Italia.jpg');
INSERT INTO posts (post_url, post_title, id_user, post_description, post_img) VALUES ('https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Gato', 3, 'Foto de gato', 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
INSERT INTO posts (post_url, post_title, id_user, post_description, post_img) VALUES ('https://www.infojobs.net/madrid/react-developer/of-i71c9373ee9484b9b992872fe843f79?applicationOrigin=search-new%7Celement%7E49468474526%7Cversion%7Ebackpack_sorted_no_norm&searchId=49468474526&page=1&sortBy=RELEVANCE', 'Oferta de empleo', 4, 'Oferta de empleo de programador con React en Infojobs', 'https://brand.infojobs.net/downloads/ij-logo_reduced/ij-logo_reduced.png');

INSERT INTO likes (id_user, id_post) values (1, 2);
INSERT INTO likes (id_user, id_post) values (1, 3);
INSERT INTO likes (id_user, id_post) values (1, 4);
INSERT INTO likes (id_user, id_post) values (2, 2);
INSERT INTO likes (id_user, id_post) values (2, 3);
INSERT INTO likes (id_user, id_post) values (3, 2);
INSERT INTO likes (id_user, id_post) values (3, 3);



-- Ver todos los usuarios --

select * from users where id_user = 6;

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


--  Ver todos los follows --

select * from follows;

-- Ver a quién sigue un usuario --

select name_user as "Siguiendo"
from users u
inner join follows f on u.id_user = f.id_user_following
where f.id_user = 7;

