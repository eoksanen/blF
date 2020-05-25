import React, {useState} from 'react'
const Blog = ({ blog }) => {
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
      LIKES: {blog.likes}
      </div>

  </div>
  )
}
export default Blog
