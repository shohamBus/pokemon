import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Loader } from 'components/loader/Loader';
import { PokemonModalProvider } from 'context/PokemonModalProvider';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <PokemonModalProvider>
    <React.StrictMode>
      <Suspense fallback={<Loader />}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Suspense>
    </React.StrictMode>
  </PokemonModalProvider>
)
