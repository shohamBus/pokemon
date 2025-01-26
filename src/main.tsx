import React  from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={ queryClient }>
      <ReactQueryDevtools />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
