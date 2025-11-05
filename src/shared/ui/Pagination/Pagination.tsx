import styles from './Pagination.module.scss';

type TProps = {
  fetchNextPage: () => void;
  isFetching: boolean;
  hasNextPage: boolean | undefined;
}

export const Pagination = ({ fetchNextPage, isFetching, hasNextPage }: TProps) => {
  if (!hasNextPage) return null;

  return(
    <div className={styles.pagination}>
      <button
        className={`${styles.pagination__button} ${isFetching ? styles.pagination__button_loading : ''}`}
        onClick={fetchNextPage}
        disabled={isFetching}
        aria-label='Загрузить ещё'
      >
        Показать еще
      </button>
    </div>
  );
};
