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
  const { imageUrl, title, content, url, postId, userId, userName, likes } = props;
  const [userLiked, setUserLiked] = useState(false); // Estado para saber si el usuario dio like al post
  const [authenticatedUserId, setAuthenticatedUserId] = useState(null); // ID del usuario autenticado

  useEffect(() => {

    // Obtener el token del localStorage
    const token = localStorage.getItem('authToken');

    //Decodificar el token para obtener el ID del usuario autenticado
    try {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.user;
      setAuthenticatedUserId(userId);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }


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
          return like.id_user === authenticatedUserId && like.id_post === postId;
        });

        setUserLiked(userLikedPost); // Set the userLiked state based on the result
      })
      .catch((error) => {
        console.error('Error while checking likes:', error);
      });
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const handleLike = () => {
    const likeUrl = `http://localhost:3000/posts/like/${postId}`;
    console.log("Sending like request to:", likeUrl);

    fetch(likeUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as needed
        // You can also update the userLiked state here if necessary
      })
      .catch((error) => {
        console.error('Error while liking:', error);
      });
  }

  return (
    <Card sx={{ maxWidth: 345, margin: '20px', padding: '50px', boxShadow: '0 0 10px black' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <Typography variant="h6" component="div" style={{ flexGrow: 1, border: '1px solid black', padding: '5px', width: '100%', borderRadius: '5px', display: 'flex', justifyContent: 'space-between' }}>
          {userName}
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
          <Button onClick={handleLike} variant="outlined" style={{ color: userLiked ? 'red' : 'black' }}>
            {userLiked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </Button>
        </Badge>
      </CardContent>
    </Card>
  );
};

export default Post;
