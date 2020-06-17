import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('when like button presse4d twice, amount of likes rices by two ', () => {

  const blogs = [
    {
    title: 'Component testing is done with react-testing-library',
    author: 'M.S.T',
    url: 'wWw',
    likes: 10
  },
  {
    title: 'Component testing',
    author: 'M.S.TT',
    url: 'https://wWw',
    likes: 11
  }
  ]
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blogs[0]} handleLike={mockHandler}  />
  )


    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
  
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
  
    
    expect(mockHandler.mock.calls).toHaveLength(2)
  
  })