import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import jwt_decode from 'jwt-decode';

const Post = (props) => {
  const { imageUrl, title, content, url, postId, userId } = props;
  const [likes, setLikes] = useState(0); // Estado para el contador de likes
  const [userLiked, setUserLiked] = useState(false); // Estado para saber si el usuario dio like
  const [authenticatedUserId, setAuthenticatedUserId] = useState(null); // ID del usuario autenticado

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('login-token');

    // Decodificar el token para obtener el ID del usuario autenticado
    try {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.user; 
      setAuthenticatedUserId(userId);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }

    fetch(`http://localhost:3000/posts/likes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('No se pudo obtener la lista de likes');
        }
      })
      .then((data) => {
        // Verificar si el usuario dio like al post actual
        const userLikedPost = data.likes.some((like) => {
          return like.id_user === authenticatedUserId && like.id_post === postId;
        });

        // Actualizar el estado de userLiked
        setUserLiked(userLikedPost);
        console.log('Likes API Data:', data);
        console.log('User Liked Post:', userLikedPost);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de likes:', error);
      });

    fetch(`http://localhost:3000/posts/${postId}/likeCount`, {
      headers: {
        'Authorization': `Bearer ${token}`,
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
        console.log('Likes Count Data:', data);
      })
      .catch((error) => {
        console.error('Error al obtener el contador de likes:', error);
      });
  }, [postId, authenticatedUserId]);

  const toggleLike = () => {
    // Realizar una solicitud a la API para dar o quitar like en función de userLiked
    const endpoint = userLiked
      ? `http://localhost:3000/posts/unlike/${postId}`
      : `http://localhost:3000/posts/like/${postId}`;

    const method = userLiked ? 'DELETE' : 'POST';

    // Obtener el token del localStorage
    const token = localStorage.getItem('login-token');

    fetch(endpoint, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
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
        console.log('Like Toggled Successfully');
      })
      .catch((error) => {
        console.error('Error al dar/quitar like:', error);
      });
  };

  console.log('Post ID:', postId);
  console.log('Authenticated User ID:', authenticatedUserId);

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

