import { lazy } from 'react';
import { useFetchRequest } from '@/shared/hooks/useFetchData';
import { useUnifiedQueryState } from '@/shared/hooks/useUnifiedQueryState';
import { MainData } from '@/shared/types/mainData';
import { Product } from '@/shared/types/products';

const ProductsList = lazy(() => import('@/features/productsList'));

const HomePage = () => {
  const dataQuery = useFetchRequest();
  const unifiedDataQuery = useUnifiedQueryState<MainData, Product>(
    dataQuery,
    (data) => data.products,
  );

  return (
    <div className="container">
      <ProductsList dataQuery={unifiedDataQuery}/>
    </div>
  );
};

export default HomePage;
