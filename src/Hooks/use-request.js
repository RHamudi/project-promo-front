import { useQuery, QueryClient } from 'react-query';

export const queryClient = new QueryClient();

export const useRequest = (...args) => {
    return useQuery(...args)
}