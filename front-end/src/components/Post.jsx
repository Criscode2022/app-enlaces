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
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';

const Post = (props) => {
  const {
    imageUrl,
    title,
    onDelete,
    userName,
    content,
    url,
    postId,
    userId,
    likes,
    updateBadgeCount, // Callback function from the parent component
    isLoggedUserPost
  } = props;

  const [userLiked, setUserLiked] = useState(false); // Estado para saber si el usuario dio like al post
  const [likesCount, setLikesCount] = useState(likes); // Contador de likes local
  const [isFollowing, setIsFollowing] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {

    // Decodificar el token para obtener el ID del usuario autenticado
    try {
      const decodedToken = jwt_decode(token);
      const userIdLogged = decodedToken.userId;

      // Verificar si el usuario sigue al autor del post cuando el componente se monta
      fetch(`http://localhost:3000/users/checkfollow/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
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

      // Check if the user liked the post when the component mounts
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
            return like.id_user === userIdLogged && like.id_post === postId;
          });

          setUserLiked(userLikedPost); // Set the userLiked state based on the result
        })
        .catch((error) => {
          console.error('Error while checking likes:', error);
        });
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }, [postId, token, userId]); // Run the effect whenever postId changes

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

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      // Make a DELETE request to your API endpoint here
      fetch(`http://localhost:3000/posts/delete/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('Response status:', response.status); // Log the response status

          if (response.status === 200) {
            // The post was deleted successfully, call the onDelete function
            onDelete(postId);
            console.log('Post deleted successfully');
            toast.success("Enlace eliminado correctamente", {
              position: toast.POSITION.TOP_CENTER
            })
          } else {
            console.error('Failed to delete the post');
          }
        })
        .catch((error) => {
          console.error('Error while deleting the post:', error);
        });
    }
  };



  return (
    <>
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
          {isLoggedUserPost && (
            <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={handleDelete}>
              <DeleteIcon></DeleteIcon> </Button>
          )}
        </CardContent>
      </Card>
      <ToastContainer />

    </>
  );
}

export default Post;
