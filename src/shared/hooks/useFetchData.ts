import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchFilterProducts, FetchRequest } from '../api/data';
import { ProductFilterParams } from '../types/products';

export const useFetchRequest = () => {
  return useQuery({
    queryKey: ['mainData'],
    queryFn: FetchRequest,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
};

export const useFetchFilterProducts = (params: Omit<ProductFilterParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['filterProducts', params],
    queryFn: ({ pageParam = 1 }) =>
      fetchFilterProducts({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.has_next
        ? lastPage.pagination.current_page + 1
        : undefined;
    },
    initialPageParam: 1,
    enabled: !!params.search.trim(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
  });
};
