import React, { useState, useEffect } from 'react';
import Post from './Post';

const ListofPosts = () => {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener los datos de localhost:3000/posts
    fetch('http://localhost:3000/posts')
      .then((response) => response.json())
      .then((data) => {
        // Extraer la propiedad 'data' del objeto JSON
        const postDataArray = data.data;

        // Actualizar el estado con los datos obtenidos
        setPostsData(postDataArray);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  return (
    <div>
      <h1>ListofPosts</h1>
      {postsData.map((post) => (
        <Post key={post.id_post} title={post.post_title} content={post.post_description} url={post.post_url} imageUrl={post.post_url} postId={post.id_post} userId={post.id_user} />
      ))}
    </div>
  );
}

export default ListofPosts;
