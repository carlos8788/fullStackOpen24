import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import NewBlog from './NewBlog';

describe('NewBlog form', () => {
    test('calls the event handler it received as props with the right details when a new blog is created', () => {
      const handleSubmitBlog = jest.fn(e => e.preventDefault());
      const component = render(<NewBlog handlesubmit={handleSubmitBlog} />);
  
      const inputTitle = component.container.querySelector('input[name="title"]');
      const inputAuthor = component.container.querySelector('input[name="author"]');
      const inputUrl = component.container.querySelector('input[name="url"]');
      const form = component.container.querySelector('form');
  
      fireEvent.change(inputTitle, { target: { value: 'Testing with Jest' } });
      fireEvent.change(inputAuthor, { target: { value: 'Jest Tester' } });
      fireEvent.change(inputUrl, { target: { value: 'http://jestjs.io' } });
      fireEvent.submit(form);
  
      expect(handleSubmitBlog.mock.calls).toHaveLength(1);
  
      const formData = Object.fromEntries(new FormData(handleSubmitBlog.mock.calls[0][0].target));
      expect(formData.title).toBe('Testing with Jest');
      expect(formData.author).toBe('Jest Tester');
      expect(formData.url).toBe('http://jestjs.io');
    });
  });
