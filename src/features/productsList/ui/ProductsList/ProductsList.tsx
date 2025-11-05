import styles from './ProductsList.module.scss';

import { MessageBlock, ProductCard } from '@/shared/ui';
import { ProductsListSkeleton } from './ProductsListSkeleton';
import { unifiedQueryState } from '@/shared/types/unifiedQuery';
import { Product } from '@/shared/types/products';

type TProps = {
  dataQuery: unifiedQueryState<Product[]>;
}

const ProductsList = ({dataQuery}: TProps) => {
  const { data, isLoading, isError, refetch } = dataQuery;

  if (isLoading) return <ProductsListSkeleton />;
  if (isError) return <MessageBlock message='Не удалось получить список :(' onRefetch={refetch}/>;
  if (!data) return <MessageBlock message='Список пуст' />;

  return (
    <section className={styles.products}>
      <ul className={styles.products__list}>
        {data.map(product => (
          <li key={product.id} className={styles.product__item}>
            <ProductCard productData={product}/>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductsList;
