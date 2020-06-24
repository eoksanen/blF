import React, { useState, useEffect } from 'react'
import './App.css';
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ShowName from './components/ShowName'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable';
import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)


  useEffect(() => { 
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort( (a,b)=> b.likes - a.likes ))
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

  const addBlog = async (blogObject) => {

    try {
      const returnedBlog = await blogService.create(blogObject)

      console.log('SENDED blog: ',blogObject)
      console.log('Returned BLog: ',returnedBlog)

      const response = setBlogs(blogs.concat(returnedBlog))
      messageSetter(`a new blog added by ${user.name} `,'add')

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      } catch (exception) {

        messageSetter('error','error')
      }
    /*
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        messageSetter(`a new blog added by ${user.name} `,'add')
      })*/
  }


  const handleLikeOf = async (id) => {

    const blog = blogs.find(b => b.id === id)

    let rBlog = await  blogService.update(blog.id,{
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    })
    setBlogs(blogs.map(bl => bl.id !== blog.id ? bl : rBlog)) 

  }

  const handleRemoveOf = async (id) => {

      blogService.remove(id)
      setBlogs(blogs.filter(n => n.id !== id))      
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


  

  const loginForm = () => {


    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (

      <div>
        <div style={hideWhenVisible}>
        <h2>Log in to application</h2>
        <Notification message={message} />
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
        <LoginForm    
          handleSubmit ={handleLogin} 
          username = {username} 
          password = {password}
          handleUsernameChange = {({ target }) => setUsername(target.value)} 
          handlePasswordChange = {({ target }) => setPassword(target.value)}
        />
        <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>


      </div>

     )
    }
    const blogForm = () => (
    <Togglable buttonLabel='add a new blog'>
    <BlogForm createBlog={addBlog} />
</Togglable>

    )

 

 if(user){   
  if(user.name === undefined){user.name = "su"}
 }

  return (

    <div>

      <h1>Blogs</h1>
      <Notification message={message} />

    {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in</p>
        <button onClick = {() => { 
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      }}>Log Out</button>
        {blogForm()}
      </div>
    }
  
 
  <br></br>
{blogs.map(blog => {
  console.log(blog)
  let removeButtonVisibility = null
  if(user && blog.user){  

    if( user.userID.localeCompare(blog.user.id) === 0 )     removeButtonVisibility  = true
    console.log('userid', user.userID)
    console.log('blog', blog.user.id)
    console.log('removebutton visibility: ',removeButtonVisibility)}

  return (
  <Blog key={blog.id} blog={blog} removeButtonVisibility={removeButtonVisibility} handleLike={() => handleLikeOf(blog.id)} handleRemove={() => handleRemoveOf(blog.id)}/>
)})}
</div>
  )
}

export default App