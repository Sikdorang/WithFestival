import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import GlobalErrorBoundary from './components/common/GlobalErrorBoundary';
import Router from './routes/index.tsx';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Toaster
          containerStyle={{
            bottom: '7rem',
          }}
        />
        <Router />
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}
