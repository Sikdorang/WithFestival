import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import GlobalErrorBoundary from './components/common/GlobalErrorBoundary';
import Router from './routes/index.tsx';
import { SocketProvider } from './providers/SocketProvider.tsx';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <GlobalErrorBoundary>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster
            containerStyle={{
              bottom: '7rem',
            }}
            position="bottom-center"
          />
          <Router />
        </QueryClientProvider>
      </SocketProvider>
    </GlobalErrorBoundary>
  );
}
