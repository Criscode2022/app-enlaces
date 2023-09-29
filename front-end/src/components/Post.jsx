import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Post = (props) => {
  const { imageUrl, title, content, url, postId } = props;
  const [likes, setLikes] = useState(0); // Estado para el contador de likes

  useEffect(() => {
    console.log(postId)
    console.log(title)
    // Realizar una solicitud a la API para obtener el contador de likes
    fetch(`http://localhost:3000/posts/${postId}/likeCount`)
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
  }, [postId]);

  

  const incrementLikes = () => {
    // Realizar una solicitud a la API para agregar un like
    fetch(`http://localhost:3000/posts/like/${postId}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo3LCJpYXQiOjE2OTU5NzU2ODd9.OUUuBEJlj-pULQp4CSMNt_YXEpBYbDdGzuJyccz12WE', // Reemplaza 'tu_token_jwt' con el token JWT válido
      },
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error('No se pudo dar like');
        }
      })
      .then(() => {
        // Incrementar el contador de likes localmente
        setLikes(likes + 1);
      })
      .catch((error) => {
        console.error('Error al dar like:', error);
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
          <Button variant="outlined" onClick={incrementLikes} style={{color:'red'}}>
            <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
          </Button>
        </Badge>
      </CardContent>
    </Card>
  );
};

export default Post;
