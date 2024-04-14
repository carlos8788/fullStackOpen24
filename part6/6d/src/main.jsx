import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnecdoteContextProvider } from './NotificationContext'; 

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <AnecdoteContextProvider> 
      <App />
    </AnecdoteContextProvider>
  </QueryClientProvider>
);
