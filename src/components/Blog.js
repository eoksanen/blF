import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
  <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick = {() => visible ? setVisible(false) : setVisible(true)}>
  {visible ? "hide" : "view" }
    </button>

      <div style={showWhenVisible}> 
      URL: {blog.url}
      <br></br>
      LIKES: {blog.likes} <button onClick={() => { 
        const rBlogs = blogService.update(blog.id,{
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1
      })
      console.log('rblogs ',rBlogs)
        setBlogs(blogs.map(bl => bl.id !== blog.id ? blog : rBlogs)) 
        }}>Like</button>
      <button onClick={() => {
        blogService.remove(blog.id)
        setBlogs(blogs.filter(n => n.id !== blog.id))      
        }}>REmove</button>
      </div>

  </div>
  )
}
export default Blog
