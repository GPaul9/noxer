import { lazy } from 'react';
import { useFetchRequest } from '@/shared/hooks/useFetchData';
import { useUnifiedQueryState } from '@/shared/hooks/useUnifiedQueryState';
import { MainData } from '@/shared/types/mainData';
import { Category } from '@/shared/types/categories';

const CategoriesList = lazy(() => import('@/features/categoriesList'));

const HomePage = () => {
  const dataQuery = useFetchRequest();
  const unifiedDataQuery = useUnifiedQueryState<MainData, Category>(
    dataQuery,
    (data) => data.categories,
  );

  return (
    <div className="container">
      <CategoriesList dataQuery={unifiedDataQuery}/>
    </div>
  );
};

export default HomePage;
