import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
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

describe('Blog add likes', () => {
  test('add likes', async () => {
    const blog = {
      id: 'idtest2',
      title: 'Component testing is',
      author: 'Test author',
      url: 'http://test.com',
      likes: 1,
      user: {
        name: 'Test user'
      }
    }
    const id = '2'
    const deleteBlog = jest.fn()
    const addLikeMock = jest.fn();
    addLikeMock.mockImplementation(() => {
      blog.likes += 1;
    });

    let component;

    component = render(
      <Blog blog={blog} userID={id} deleteBlog={deleteBlog} addLikes={addLikeMock} />
    );
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);
    const likeButton = component.container.querySelector('.likeBtn');
    await act(async () => {
      fireEvent.click(likeButton);
      fireEvent.click(likeButton);
    });
    expect(addLikeMock).toHaveBeenCalledTimes(2);

  })
})