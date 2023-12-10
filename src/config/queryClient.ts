import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      optimisticResults: true,
      retry: false,
    },
  },
});

export default queryClient;
