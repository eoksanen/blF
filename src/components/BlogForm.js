import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setTitle] = useState('') 
  const [newAuthor, setAuthor] = useState('') 
  const [newUrl, setUrl] = useState('') 


  const addBlog = (event) => {
    event.preventDefault()



    const newBlog = 
      {
      title: newTitle,
      author: newAuthor,
      url: newUrl
      }

      createBlog(newBlog)
      
      setTitle('')
      setAuthor('')
      setUrl('')

      
    } 
  

   
    return (
      <div>
        <h2>Create a new blog</h2>
  
        <form onSubmit={addBlog}>
            <div>
                Title
          <input
                id="title"
                type="text"
                value={newTitle}
                name="Title"
                onChange={(event) => setTitle(event.target.value)}
          />
          </div>
          <div>
              Author
          <input
                id="author"
                type="text"
                value={newAuthor}
                name="Author"
                onChange={(event) => setAuthor(event.target.value)}
            />
            </div>
            <div>
                Url
            <input
                id="url"
                type="text"
                value={newUrl}
                name="Url"
                onChange={(event) => setUrl(event.target.value)}
            />
            </div>
          <button type="submit">save</button>
        </form>
      </div>
    )
  }

export default BlogForm