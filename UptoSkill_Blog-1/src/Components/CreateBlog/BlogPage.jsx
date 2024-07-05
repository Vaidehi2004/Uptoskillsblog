import React from 'react'
import Header from '../LandingPage/Header/Header'
import Footer from '../LandingPage/Footer/Footer'
import BlogContent from './BlogMain/BlogContent'
import { useParams } from 'react-router-dom';


const BlogPage = () => {
  return (
    <div>
      <Header/>
      <BlogContent/>
      <Footer/>
    </div>
  )
}

export default BlogPage
