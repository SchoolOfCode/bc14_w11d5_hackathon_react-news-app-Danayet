import './App.css';
import React, { useEffect, useState } from 'react';
import NewsCard from './components/NewsCard';

const apiKey = "9192e9c7d5db61eac7caaf50bb10c77b";

function App() {
  const [news, setNews] = useState([]); // State variable to store news articles
  const [page, setPage] = useState(1); // State variable to track current page number
  const [searchQuery, setSearchQuery] = useState(''); // State variable to store user's search query
  const [selectedCategory, setSelectedCategory] = useState(''); // State variable to store selected news category

  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=${apiKey}&page=${page}`;

      if (searchQuery) {
        url += `&q=${searchQuery}`; // Add user's search query to the API URL
      }

      if (selectedCategory) {
        url += `&topic=${selectedCategory}`; // Add selected category to the API URL
      }

      let response = await fetch(url);
      let data = await response.json();

      if (page === 1) {
        setNews(data.articles); // Set news articles in state for the first page
      } else {
        setNews((prevNews) => [...prevNews, ...data.articles]); // Append news articles to existing state for subsequent pages
      }
    };

    fetchNews();
  }, [page, searchQuery, selectedCategory]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number to load more news articles
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update search query based on user input
    setPage(1); // Reset page number when search query changes
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category); // Update selected category based on user selection
    setPage(1); // Reset page number when category changes
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="category-filters">
          <button onClick={() => handleCategoryFilter('sports')}>Sports</button>
          <button onClick={() => handleCategoryFilter('technology')}>Technology</button>
          <button onClick={() => handleCategoryFilter('entertainment')}>Entertainment</button>
        </div>
        <div className="news-cards">
          {news.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              description={article.description}
              source={article.source.name}
              publishedAt={article.publishedAt}
            />
          ))}
        </div>
        {news.length > 0 && (
          <div className="load-more-container">
            <button onClick={handleLoadMore}>Load More</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;


