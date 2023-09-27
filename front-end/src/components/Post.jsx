import React from 'react';

const Post = (props) => {
  const { imageUrl, title, content, url } = props;

  return (
<div className="card" style={{ width: '18rem', border: '1px solid grey', borderRadius: '10px', margin: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <img src={imageUrl} className="card-img-top" alt="Post Image" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <a href={url} target='_blank' className="btn btn-primary">Visitar</a>
      </div>
    </div>
  );
}

export default Post;
