import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';

const Post = (props) => {
  const { imageUrl, title, content, url, postId } = props;
  const [likes, setLikes] = useState(0); 

  const incrementLikes = () => {
    fetch(`/api/posts/${postId}/like`, {
      method: 'POST',
      headers: {
      },
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error('No se pudo dar like');
        }
      })
      .then((data) => {
        setLikes(data.likes);
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
          <Button variant="outlined" onClick={incrementLikes}>
            Like
          </Button>
        </Badge>
      </CardContent>
    </Card>
  );
};

export default Post;
