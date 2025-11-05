import { useFetchFilterProducts } from '@/shared/hooks/useFetchData';
import { useUnifiedQueryState } from '@/shared/hooks/useUnifiedQueryState';
import { Product, ProductFilterResponse } from '@/shared/types/products';
import { Pagination } from '@/shared/ui/Pagination';
import { lazy } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const ProductsList = lazy(() => import('@/features/productsList'));

const SearchResultsPage = () => {
  const { searchValue } = useParams<{ searchValue: string }>();

  if (!searchValue) return <Navigate to={'/'} replace />
  const dataQuery = useFetchFilterProducts({per_page: 20, search: searchValue});
  const unifiedDataQuery = useUnifiedQueryState<ProductFilterResponse, Product>(
    dataQuery,
    (data) => data.products,
  )

  const {fetchNextPage, isFetching, hasNextPage} = dataQuery;

  return (
    <div className="container page-padding">
      <h2>Показаны результаты по запросу: {searchValue}</h2>
      <ProductsList dataQuery={unifiedDataQuery}/>
      <Pagination
        fetchNextPage = {fetchNextPage}
        isFetching = {isFetching}
        hasNextPage = {hasNextPage} />
    </div>
  );
};

export default SearchResultsPage;
