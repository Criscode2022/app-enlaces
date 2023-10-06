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
  const {
    imageUrl,
    title,
    content,
    url,
    postId,
    likes,
    updateBadgeCount, // Callback function from the parent component
  } = props;

  const [userLiked, setUserLiked] = useState(false); // Estado para saber si el usuario dio like al post
  const [likesCount, setLikesCount] = useState(likes); // Contador de likes local

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('authToken');

    // Decodificar el token para obtener el ID del usuario autenticado
    try {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      // Check if the user liked the post when the component mounts
      fetch(`http://localhost:3000/posts/likes`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
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
            return like.id_user === userId && like.id_post === postId;
          });

          setUserLiked(userLikedPost); // Set the userLiked state based on the result
        })
        .catch((error) => {
          console.error('Error while checking likes:', error);
        });
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }, [postId]); // Run the effect whenever postId changes

  const toggleLike = () => {
    // Realizar una solicitud a la API para dar o quitar like en función de userLiked
    const endpoint = userLiked
      ? `http://localhost:3000/posts/unlike/${postId}`
      : `http://localhost:3000/posts/like/${postId}`;

    const method = userLiked ? 'DELETE' : 'POST';

    // Obtener el token del localStorage
    const token = localStorage.getItem('authToken');

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
        setLikesCount(userLiked ? likesCount - 1 : likesCount + 1);
        console.log('Like Toggled Successfully');

        // Update the badge count in the parent component
        updateBadgeCount(postId, likesCount);
      })
      .catch((error) => {
        console.error('Error al dar/quitar like:', error);
      });
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '20px', padding: '50px', boxShadow: '0 0 10px black' }}>
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
        <Badge badgeContent={likesCount} color="primary">
          <Button onClick={toggleLike} variant="outlined" style={{ color: userLiked ? 'red' : 'black' }}>
            {userLiked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </Button>
        </Badge>
      </CardContent>
    </Card>
  );
};

export default Post;
