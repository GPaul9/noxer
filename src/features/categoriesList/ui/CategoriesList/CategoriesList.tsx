import styles from './CategoriesList.module.scss';

import { MessageBlock } from '@/shared/ui';
import { CategoriesCard } from '../CategoriesCard/CategoriesCard';
import { CategoriesListSkeleton } from './CategoriesListSkeleton';
import { unifiedQueryState } from '@/shared/types/unifiedQuery';
import { Category } from '@/shared/types/categories';

type TProps = {
  dataQuery: unifiedQueryState<Category[]>;
}

const CategoriesList = ({dataQuery}: TProps) => {
  const { data, isLoading, isError, refetch } = dataQuery;

  if (isLoading) return <CategoriesListSkeleton />;
  if (isError) return <MessageBlock message='Не удалось получить список категорий :(' onRefetch={refetch}/>;
  if (!data) return <MessageBlock message='Список пуст' />;

  return (
    <section className={styles.categories}>
      <ul className={styles.categories__list}>
        {data.map(category => (
          <li key={category.Category_ID} className={styles.category__item}>
            <CategoriesCard categoryData={category}/>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoriesList;
