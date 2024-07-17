import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import Blog from './Components/CreateBlog/Blog';
import BlogContent from './Components/CreateBlog/BlogPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/CreateBlog" element={<Blog />} />
          <Route path="/BlogPage/:id" element={<BlogContent />} />

          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
