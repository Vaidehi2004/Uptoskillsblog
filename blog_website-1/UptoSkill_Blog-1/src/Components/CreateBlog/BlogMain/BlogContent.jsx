import React from 'react';
import './BlogContent.css';
import { Link, useParams } from 'react-router-dom';
import { cards } from '../../LandingPage/Cards/CardSection';

const BlogContent = () => {
  const { id } = useParams(); // Get the card ID from the route parameter
  const card = cards.find(card => card.id === parseInt(id, 10)); // Find the specific card by ID

  return (
    <div className='blog-content-container'>
      <div className='blogContent'>
        <div className='details'>
          <div className='blog-img'>
            <img src={card.cover} alt="" />
          </div>
          <h2 className='blog-title'>{card.title}</h2>
          <p className='author-date'>
            <span className="user-icon">
              <i className="fas fa-user"></i>
            </span>
            {card.authorName} | {card.createdAt}
          </p>
          <div className='mainContent'>{card.description}</div>
        </div>
      </div>
      <div className='sidebar'>
        <h3>Latest Reads</h3>
        <ul>
          {cards.map(card => (
            <li key={card.id}>
              <a href={card.link}>{card.title}</a>
              <p>
                <Link to={card.link}>Read More<span><i className="fa-solid fa-arrow-right"></i></span></Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  );
}

export default BlogContent;