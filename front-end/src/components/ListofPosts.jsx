import React, { useState, useEffect } from 'react';
import Post from './Post';

const ListofPosts = () => {
  const [postsData, setPostsData] = useState([]);
  const [badgeCounts, setBadgeCounts] = useState({}); // Track badge counts by postId

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener los datos de localhost:3000/posts
    fetch('http://localhost:3000/posts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Extraer la propiedad 'data' del objeto JSON
        const postDataArray = data.data;

        // Actualizar el estado con los datos obtenidos
        setPostsData(postDataArray);

        // Initialize badge counts
        const initialBadgeCounts = {};
        postDataArray.forEach((post) => {
          initialBadgeCounts[post.id_post] = post.like_count;
        });
        setBadgeCounts(initialBadgeCounts);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  // Function to update badge count for a specific postId
  const updateBadgeCount = (postId, count) => {
    setBadgeCounts((prevCounts) => ({
      ...prevCounts,
      [postId]: count,
    }));
  };

  return (
    <>
      <h2>Enlaces</h2>

      <div id='postsContainer'>
        {postsData.map((post) => (
          <Post
            key={post.id_post}
            title={post.post_title}
            content={post.post_description}
            url={post.post_url}
            imageUrl={post.post_img}
            postId={post.id_post}
            userId={post.id_user}
            userName={post.name_user}
            likes={post.like_count}
            updateBadgeCount={updateBadgeCount} // Pass the callback function
          />
        ))}
      </div>
    </>
  );
}

export default ListofPosts;
