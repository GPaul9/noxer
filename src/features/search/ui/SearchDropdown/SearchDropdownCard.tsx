import styles from './SearchDropdown.module.scss';

import { Product } from '@/shared/types/products';
import placeholderImg from '@/assets/placeholder-image.webp';
import { formatRub } from '@/shared/utils/stringUtils';
import { Link } from 'react-router-dom';

type TProps = {
  dataProduct: Product;
}

export const SearchDropdownCard = ({ dataProduct }: TProps) => {
  const {id, images, name, price, old_price: oldPrice} = dataProduct;

  const mainImageUrl: string = images.find(image => image.MainImage === true)?.Image_URL ?? placeholderImg;

  return (
    <Link to={`/:${id}`} className={styles['dropdown-card']}>
      <div className={styles['dropdown-card__img-wrapper']}>
        <img src={mainImageUrl} alt={name} className={styles['dropdown-card__img']} loading='lazy'/>
      </div>
      <div className={styles['dropdown-card__details']}>
        <h4 className={styles['dropdown-card__title']}>{name}</h4>
        <div className={styles['dropdown-card__price-wrapper']}>
          <strong className={styles['dropdown-card__price']}>{formatRub(price)}</strong>
          {oldPrice !== null &&
            <strong className={styles['dropdown-card__old-price']}>{formatRub(oldPrice)}</strong>
          }
        </div>
      </div>
    </Link>
  );
};
