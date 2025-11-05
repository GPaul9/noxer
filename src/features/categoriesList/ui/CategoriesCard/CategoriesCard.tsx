import { Category } from '@/shared/types/categories';
import styles from './CategoriesCard.module.scss';
import placeholderImg from '@/assets/placeholder-image.webp';
import { Link } from 'react-router-dom';

type TProps = {
  categoryData: Category;
}

export const CategoriesCard = ({categoryData}: TProps) => {
  return (
    <article className={styles.card}>
      <Link to={`/catalog/${encodeURIComponent(categoryData.Category_Name)}`} className={styles.card__content}>
        <div className={styles['card__img-wrapper']}>
          <img src={categoryData.Category_Image === ''? placeholderImg : categoryData.Category_Image}
            alt={categoryData.Category_Name}
            className={styles.card__img}
            loading='lazy'
            onError={(e) => e.currentTarget.src = placeholderImg}
          />
        </div>

        <h3 className={styles.card__title}>{categoryData.Category_Name}</h3>
      </Link>
    </article>
  );
};
