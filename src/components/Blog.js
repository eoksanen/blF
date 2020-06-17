import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, removeButtonVisibility, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showRemoveButton = { display: removeButtonVisibility ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
  <div style={blogStyle} className='blog'>
    {blog.title} {blog.author} <button onClick = {() => visible ? setVisible(false) : setVisible(true)}>
  {visible ? "hide" : "view" }
    </button>

      <div style={showWhenVisible} className='moreInfo'> 
      URL: {blog.url}
      <br></br>
      LIKES: {blog.likes} <button onClick={handleLike}
        >Like</button>
      <button style = {showRemoveButton} onClick={() => {
        blogService.remove(blog.id)
        setBlogs(blogs.filter(n => n.id !== blog.id))      
        }}>REmove</button>
      </div>

  </div>
  )
}
export default Blog
