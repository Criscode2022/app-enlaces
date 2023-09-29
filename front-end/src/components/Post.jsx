import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Post = (props) => {
  const { imageUrl, title, content, url, postId, userId, isAuthenticated } = props;
  const [likes, setLikes] = useState(0); // Estado para el contador de likes
  const [userLiked, setUserLiked] = useState(false); // Estado para saber si el usuario dio like

  useEffect(() => {
    // Realizar una solicitud a la API para obtener el contador de likes y verificar si el usuario dio like
    fetch(`http://localhost:3000/posts/${postId}/likeCount`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo2LCJpYXQiOjE2OTYwMDcwMjJ9.SyJgCX_IJTCFui7tfizP1AWH8qUt9QHxIZX7KGWru94`, // Reemplaza 'yourAccessToken' con el token JWT válido
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('No se pudo obtener el contador de likes');
        }
      })
      .then((data) => {
        // Actualizar el contador de likes en el estado
        setLikes(data.likeCount);
      })
      .catch((error) => {
        console.error('Error al obtener el contador de likes:', error);
      });

    // Verificar si el usuario ya ha dado like al post
    if (isAuthenticated) {
      fetch(`http://localhost:3000/posts/${postId}/userLiked`, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo2LCJpYXQiOjE2OTYwMDcwMjJ9.SyJgCX_IJTCFui7tfizP1AWH8qUt9QHxIZX7KGWru94`, // Reemplaza 'yourAccessToken' con el token JWT válido
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('No se pudo verificar si el usuario dio like');
          }
        })
        .then((data) => {
          // Actualizar el estado de userLiked
          setUserLiked(data.userLiked);
        })
        .catch((error) => {
          console.error('Error al verificar si el usuario dio like:', error);
        });
    }
  }, [postId, isAuthenticated]);

  const toggleLike = () => {
    // Realizar una solicitud a la API para dar o quitar like en función de userLiked
    const endpoint = userLiked
      ? `http://localhost:3000/posts/unlike/${postId}`
      : `http://localhost:3000/posts/like/${postId}`;

    const method = userLiked ? 'DELETE' : 'POST';

    fetch(endpoint, {
      method: method,
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo2LCJpYXQiOjE2OTYwMDcwMjJ9.SyJgCX_IJTCFui7tfizP1AWH8qUt9QHxIZX7KGWru94`, // Reemplaza 'yourAccessToken' con el token JWT válido
      },
    })
      .then((response) => {
        if (response.status === 201 || response.status === 200 || response.status === 204) {
          return response.json();
        } else {
          throw new Error('No se pudo dar/quitar like');
        }
      })
      .then(() => {
        // Cambiar el estado de userLiked y actualizar el contador de likes localmente
        setUserLiked(!userLiked);
        setLikes(userLiked ? likes - 1 : likes + 1);
      })
      .catch((error) => {
        console.error('Error al dar/quitar like:', error);
      });
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '20px', padding: '50px' }}>
      <CardMedia component="img" height="140" image={imageUrl} alt="Post Image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        <Button variant="contained" href={url} target="_blank" fullWidth>
          Visitar
        </Button>
        <Badge badgeContent={likes} color="primary">
          <Button variant="outlined" onClick={toggleLike} style={{ color: 'red' }}>
            {userLiked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </Button>
        </Badge>
      </CardContent>
    </Card>
  );
};

export default Post;
