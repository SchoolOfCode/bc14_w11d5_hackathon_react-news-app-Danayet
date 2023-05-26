import React from 'react';

function NewsCard({ title, description, source, publishedAt }) {
  return (
    <div className="news-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{source}</p>
      <p>{publishedAt}</p>
    </div>
  );
}

export default NewsCard;
