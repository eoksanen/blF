import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


describe('blog content',() => {


let component



beforeEach(() => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'M.S.T',
    url: 'wWw',
    likes: 10

  }

  component = render(
    <Blog blog={blog} />
  )
})

test('renders content', () => {


  const bd = component.container.querySelector('body')


  console.log(prettyDOM(bd))

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  expect(component.container).toHaveTextContent(
    'M.S.T'
  )

  const div = component.container.querySelector('.moreInfo')
  expect(div).toHaveStyle('display:none')

})
test('show hidden content when show button pressed', () => {


const button = component.getByText('view')
fireEvent.click(button)

const div = component.container.querySelector('.moreInfo')
expect(div).not.toHaveStyle('display:none')


})
})
