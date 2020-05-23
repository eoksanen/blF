import React, { useState, useEffect } from 'react'
import './App.css';
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ShowName from './components/ShowName'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 

  useEffect(() => { 
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
}, [])

const messageSetter =(errorMessage, errorStyle) => {
    
  setMessage([errorMessage,
    errorStyle
  ])
setTimeout(() => {
  setMessage([null])
}, 5000)
  console.log(errorMessage)

}


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      
      messageSetter(`welcome ${user.name}`,
      'add')

    } catch (exception) {
      messageSetter('wrong credentials',
      'error')
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    const newBlog = 
      {
      title: title,
      author: author,
      url: url,
      likes: 0
      }
    try {
      const res = await blogService.create(newBlog)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
        messageSetter(`a new blog added by ${user.name} `,
        'add')
      
    } catch (exception) {
      messageSetter(exception.response.data.error,
      'error')
    }
  }

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }
  else{
    return (
    
      <div className={message[1]}>
        {message[0]}
      </div>
    )
  }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
          
        </form>
      </div>
    )
  }
  if(user.name === undefined){user.name = "su"}

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} />

    <ShowName name ={user.name} /><button onClick = {() => { 
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      }}>Log Out</button>
        <br></br>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          <div>
            title:
              <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              />
          </div>
          <div>
            author:
              <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              />
          </div>
          <div>
            url:
              <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              />
          </div>
          <button type="submit">create</button>
        </form>
        <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App