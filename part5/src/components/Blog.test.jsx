import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  test('renders content', () => {
    const blog = {
      id: 'idtest1',
      title: 'Component testing is',
      author: 'Test author',
      url: 'http://test.com',
      likes: 1,
      user: {
        name: 'Test user'
      }
    }
    const id = '1'
    const deleteBlog = jest.fn()

    const component = render(
      <Blog blog={blog} userID={id} deleteBlog={deleteBlog} />
    )

    expect(component.container).toHaveTextContent('Component testing is')
    expect(component.container).toHaveTextContent('Test author')
    expect(component.container.querySelector('.infoExtra')).toBeNull()

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    // expect(deleteBlog).not.toHaveBeenCalled()
    expect(component.container.querySelector('.url')).toBeInTheDocument()
  })
})
