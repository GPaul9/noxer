import { UseQueryResult, UseInfiniteQueryResult, InfiniteData } from '@tanstack/react-query';
import { unifiedQueryState } from '../types/unifiedQuery';

const isInfiniteQuery = <T>(
  query: UseQueryResult<T> | UseInfiniteQueryResult<InfiniteData<T>>
): query is UseInfiniteQueryResult<InfiniteData<T>> => {
  return (
    typeof query === 'object' &&
    query !== null &&
    'fetchNextPage' in query &&
    typeof (query as any).fetchNextPage === 'function'
  )
};

export function useUnifiedQueryState<T, TItem>(
  query: UseQueryResult<T> | UseInfiniteQueryResult<InfiniteData<T>>,
  extractData: (data: T) => TItem[]
): unifiedQueryState<TItem[]> {
  const baseState: unifiedQueryState<TItem[]> = {
    data: [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };

  if (!query.data) return baseState;

  if (isInfiniteQuery(query)) {
    baseState.data = query.data.pages.flatMap(page => extractData(page));
    return {
      ...baseState,
      isFetching: query.isFetching,
      hasNextPage: query.hasNextPage,
      hasPreviousPage: query.hasPreviousPage,
      fetchNextPage: query.fetchNextPage,
      fetchPreviousPage: query.fetchPreviousPage,
    };
  }

  baseState.data = extractData(query.data);
  return baseState;
}
