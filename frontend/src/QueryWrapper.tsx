import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

interface QueryWrapperProps {
  children: ReactNode;
}

export const QueryWrapper = ({ children }: QueryWrapperProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        useErrorBoundary: false
      },
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, //24 hours cached
        refetchOnWindowFocus: false,
        useErrorBoundary: false,
        retry: (failureCount: number, error: any) => {
          if (error.status === 404 || error.status === 403) {
            return false;
          }
          return failureCount > 3;
        },
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
