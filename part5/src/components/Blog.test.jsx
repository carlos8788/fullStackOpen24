import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', async () => {
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
    const deleteBlog = () => console.log('first')
    const { container } = render(<Blog blog={blog} userID={id} deleteBlog={deleteBlog} />)
    
    const authorElement = screen.getByText('Author: Test author')
    expect(authorElement).toBeInTheDocument()

    const viewButton = screen.getByText('view')
    expect(viewButton).toBeInTheDocument()
    const boxElement = container.querySelector('.infoExtra');
    expect(boxElement).not.toBeInTheDocument()
})