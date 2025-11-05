import styles from './ProductCard.module.scss';

import { formatRub } from '@/shared/utils/stringUtils';
import { Product } from '@/shared/types/products';
import { Link } from 'react-router-dom';
import placeholderImg from '@/assets/placeholder-image.webp';
import { ProductCardMarkers } from './ProductCardMarkers';

type TProps = {
  productData: Product;
}

export const ProductCard = ({productData}: TProps) => {
  const mainImageUrl: string = productData.images.find(image => image.MainImage === true)?.Image_URL ?? placeholderImg;

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (event.currentTarget.src !== placeholderImg) {
      event.currentTarget.src = placeholderImg;
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.card__content}>
        <div className={styles['card__img-wrapper']}>
          <img src={mainImageUrl}
            alt={productData.name}
            className={styles.card__img}
            loading='lazy'
            onError={handleImageError}
          />
        </div>

        <div className={styles.card__wrapper}>
          <div className={styles['card__price-wrapper']}>
            <strong className={styles.card__price}>{formatRub(productData.price)}</strong>
            {productData.old_price !== null &&
              <strong className={styles['card__old-price']}>{formatRub(productData.old_price)}</strong>
            }
          </div>
          <h3 className={styles.card__title}>{productData.name}</h3>
        </div>
      </div>
      <Link to={`/${productData.id}`} className={styles.card__link}>Подробнее</Link>

      <ProductCardMarkers marks={productData.marks}/>
    </article>
  );
};
