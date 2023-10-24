import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      optimisticResults: true,
      retry: false,
    },
  },
});

export default queryClient;
