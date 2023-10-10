import React, { useState, useEffect, useContext } from 'react';
import Post from './Post';
import { AuthContext } from '../context/AuthContext';

const ListofPostsFollowing = () => {
  const [postsData, setPostsData] = useState([]);
  const [badgeCounts, setBadgeCounts] = useState({}); // Track badge counts by postId
  const { token } = useContext(AuthContext); // Obtener el token del contexto de autenticación

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener los datos de localhost:3000/posts
    fetch('http://localhost:3000/posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Extraer la propiedad 'data' del objeto JSON
        const postDataArray = data.data;

        // Initialize badge counts
        const initialBadgeCounts = {};
        postDataArray.forEach((post) => {
          initialBadgeCounts[post.id_post] = post.like_count;
        });
        setBadgeCounts(initialBadgeCounts);

        // Filtrar los posts para mostrar solo los de usuarios seguidos
        fetch(`http://localhost:3000/users/following`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((followResponse) => followResponse.json())
          .then((followData) => {
            const usersFollowed = followData.users.map((user) => user.id_user);
            const filteredPosts = postDataArray.filter((post) =>
              usersFollowed.includes(post.id_user)
            );
            setPostsData(filteredPosts);
          })
          .catch((error) => {
            console.error('Error al obtener la lista de usuarios seguidos:', error);
          });
      })
      .catch((error) => {
        console.error('Error al obtener los datos de los posts:', error);
      });
  }, [token]);

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

export default ListofPostsFollowing;
