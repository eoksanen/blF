import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { 
    target: { value: 'testing of forms could be easier' } 
  })
  fireEvent.change(authorInput, { 
    target: { value: 'coding horror' } 
  })
  fireEvent.change(urlInput, { 
    target: { value: 'https://blog.codinghorror.com' } 
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
  expect(createBlog.mock.calls[0][0].author).toBe('coding horror' )
  expect(createBlog.mock.calls[0][0].url).toBe('https://blog.codinghorror.com' )
})