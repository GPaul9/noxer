import styles from './ProductsList.module.scss';

import Skeleton from 'react-loading-skeleton';

export const ProductsListSkeleton = () => {
  return (
    <section className={styles.products}>
      <div className={styles.products__list}>
        {Array.from({length: 6}, (_, index) => (
          <Skeleton key={index} height={274}/>
        ))}
      </div>
    </section>
  );
};
