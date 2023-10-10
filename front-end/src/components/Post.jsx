import { useEffect, useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../context/AuthContext'; // Importa el contexto de autenticación

const Post = (props) => {
  const {
    imageUrl,
    title,
    content,
    url,
    postId,
    likes,
    updateBadgeCount,
    userName,
    userId, // Asumiendo que tienes el userId en las propiedades
  } = props;

  const [userLiked, setUserLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [isFollowing, setIsFollowing] = useState(false);

  const { token } = useContext(AuthContext); // Obtiene el token del contexto de autenticación

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    try {
      const decodedToken = jwt_decode(authToken);
      const authenticatedUserId = decodedToken.userId;

      // Verificar si el usuario dio like al post cuando el componente se monta
      // (Código para verificar likes)

      // Verificar si el usuario sigue al autor del post cuando el componente se monta
      fetch(`http://localhost:3000/users/checkfollow/${userId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('No se pudo verificar el seguimiento');
          }
        })
        .then((data) => {
          const isUserFollowing = data.mensaje === 'Sigues a este usuario';
          setIsFollowing(isUserFollowing);
        })
        .catch((error) => {
          console.error('Error while checking follow:', error);
        });
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }, [postId, userId]);
  // Run the effect whenever postId or userId changes

  const toggleLike = () => {
    // ... (código existente para dar/quitar like)
  };

  const handleFollow = () => {
    if (!token) {
      // El usuario no está autenticado, puedes redirigirlo al inicio de sesión o mostrar un mensaje
      console.log('El usuario no está autenticado. Debe iniciar sesión para seguir al autor.');
      return;
    }

    // Definir el endpoint para seguir o dejar de seguir al autor del post
    const followEndpoint = isFollowing
      ? `http://localhost:3000/users/unfollow/${userId}`
      : `http://localhost:3000/users/follow/${userId}`;

    const method = isFollowing ? 'DELETE' : 'POST';

    fetch(followEndpoint, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 201 || response.status === 200 || response.status === 204) {
          setIsFollowing(!isFollowing);
          console.log(`Usuario ${isFollowing ? 'dejó de seguir' : 'siguió'} al autor`);
        } else {
          throw new Error('No se pudo realizar la acción de seguimiento/dejar de seguir');
        }
      })
      .catch((error) => {
        console.error('Error al seguir/dejar de seguir al autor:', error);
      });
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '20px', padding: '50px', boxShadow: '0 0 10px black' }}>
      <CardMedia component="img" height="140" image={imageUrl} alt="Post Image" />
      <CardContent>
        <Typography variant="h6" component="div" style={{ flexGrow: 1, border: '1px solid black', padding: '5px', width: '100%', borderRadius: '5px', display: 'flex', justifyContent: 'space-between' }}>
          {userName}
          <Button variant="contained" style={{ backgroundColor: isFollowing ? '#f00' : '#007bff', color: 'white' }} onClick={handleFollow}>
            {isFollowing ? 'Dejar de seguir' : 'Seguir'}
          </Button>
        </Typography>
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
