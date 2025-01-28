import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Loader } from 'components/loader/Loader';
import { Games } from 'components/games/Games';
import { PokemonModalProvider } from 'context/PokemonModalProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <Router>
    <PokemonModalProvider>
      <React.StrictMode>
        <Suspense fallback={<Loader />}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/game" element={<Games />} />
            </Routes>
          </QueryClientProvider>
        </Suspense>
      </React.StrictMode>
    </PokemonModalProvider>
  </Router>
)
