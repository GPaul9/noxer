export interface unifiedQueryState<TData> {
  data: TData;
  isLoading: boolean;
  isError: boolean;
  isFetching?: boolean
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  fetchNextPage?: () => void;
  fetchPreviousPage?: () => void;
  refetch: () => void;
};
