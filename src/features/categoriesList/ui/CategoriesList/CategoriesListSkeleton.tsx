import styles from './CategoriesList.module.scss';

import Skeleton from 'react-loading-skeleton';

export const CategoriesListSkeleton = () => {
  return (
    <section className={styles.categories}>
      <div className={styles.categories__list}>
        {Array.from({length: 12}, (_, index) => (
          <Skeleton key={index} height={140}/>
        ))}
      </div>
    </section>
  );
};
