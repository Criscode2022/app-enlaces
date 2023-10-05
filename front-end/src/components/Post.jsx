import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Post = (props) => {
  const { imageUrl, title, content, url, postId, userId, userName, likes } = props;


  const handleLike = () => {
    fetch(`http://localhost:3000/posts/like/${postId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
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
          <Button onClick={handleLike} variant="outlined" style={{ color: 'red' }}>
            <FavoriteIcon />
          </Button>
        </Badge>
      </CardContent>
    </Card>
  );
};

export default Post;
