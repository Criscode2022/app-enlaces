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
  const { imageUrl, title, content, url, postId, userId, userName } = props;
  const [likes, setLikes] = useState(0); // Estado para el contador de likes
  const [userLiked, setUserLiked] = useState(false); // Estado para saber si el usuario dio like
  const [authenticatedUserId, setAuthenticatedUserId] = useState(null); // ID del usuario autenticado
  const [isFollowing, setIsFollowing] = useState(false); // Estado para saber si el usuario está siguiendo a la persona

  useEffect(() => {
    // Consulta para verificar si el usuario está siguiendo al usuario deseado
    const checkFollowing = () => {
      // Realizar una solicitud GET a la API para verificar si el usuario sigue a la persona
      const endpoint = `http://localhost:3000/users/isFollowing/${userId}`;

      // Obtener el token del localStorage
      const token = localStorage.getItem('login-token');

      fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Error al verificar el seguimiento del usuario');
          }
        })
        .then((data) => {
          // Actualiza el estado isFollowing en función de la respuesta de la API
          setIsFollowing(data.isFollowing);
          console.log('Is Following:', data.isFollowing);
        })
        .catch((error) => {
          console.error('Error al verificar el seguimiento del usuario:', error);
        });
    };

    // Obtener el token del localStorage
    const token = localStorage.getItem('login-token');

    // Llama a la función checkFollowing para obtener el estado inicial de seguimiento
    checkFollowing();

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
  }, [postId, authenticatedUserId, userId, isFollowing]);

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

  const handleFollow = () => {
    // Realizar una solicitud a la API para seguir o dejar de seguir al usuario
    const endpoint = `http://localhost:3000/users/${isFollowing ? 'unfollow' : 'follow'}/${userId}`;

    // Obtener el token del localStorage
    const token = localStorage.getItem('login-token');

    fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(isFollowing ? 'Dejaste de seguir al usuario.' : 'Usuario seguido con éxito.');
          // Actualiza el estado de isFollowing en función del resultado
          setIsFollowing(!isFollowing);
        } else if (response.status === 400) {
          console.log(isFollowing ? 'No sigues a este usuario.' : 'Ya sigues a este usuario.');
        } else {
          throw new Error('No se pudo realizar la operación de seguimiento/dejar de seguir al usuario');
        }
      })
      .catch((error) => {
        console.error('Error al seguir/dejar de seguir al usuario:', error);
      });
  };



  console.log('Post ID:', postId);
  console.log('Authenticated User ID:', authenticatedUserId);

  return (
    <Card sx={{ maxWidth: 345, margin: '20px', padding: '50px', boxShadow: '0 0 10px black' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <Typography variant="h6" component="div" style={{ flexGrow: 1, border: '1px solid black', padding: '5px', width: '100%', borderRadius: '5px', display: 'flex', justifyContent: 'space-between' }}>
          {userName}
          <Button variant="contained" style={{ backgroundColor: isFollowing ? '#f00' : '#007bff', color: 'white' }} onClick={handleFollow}>
            {isFollowing ? 'Dejar de seguir' : 'Seguir'}
          </Button>
        </Typography>
      </div>
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
