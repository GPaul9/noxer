import styles from './SearchDropdown.module.scss';

import SearchIcon from '@/assets/serach-icon.svg?react';
import { popularSeek } from './popularSeek';
import { useLockBodyScroll } from '@/shared/hooks/useLockBodyScroll';
import { SearchDropdownCard } from './SearchDropdownCard';
import { useCallback, useEffect, useMemo } from 'react';
import { unifiedQueryState } from '@/shared/types/unifiedQuery';
import { Product } from '@/shared/types/products';

type Tprops = {
  dataQuery: unifiedQueryState<Product[]>;
  searchValue: string;
  setSearchValue: (_value: string) => void;
}

export const SearchDropdown = ({ dataQuery, searchValue, setSearchValue }: Tprops) => {
  const { data, isLoading } = dataQuery;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useLockBodyScroll();

  const handleSelectPopular = useCallback((item: string) => {
    setSearchValue(item);
  }, [setSearchValue]);

  const popularList = useMemo(() => popularSeek.map((item, index) => (
    <li key={index} className={styles['dropdown__popular-item']}>
      <SearchIcon className={styles['dropdown__popular-icon']} />
      <button
        className={styles['dropdown__popular-content']}
        onClick={() => handleSelectPopular(item)}
      >
        {item}
      </button>
    </li>
  )), [handleSelectPopular]);

  if (isLoading) return (
    <div className={styles.dropdown}>
      <div className={styles['dropdown__loader-icon']}></div>
    </div>
  );

  if (searchValue === '') return (
    <div className={styles.dropdown}>
      <div className='container'>
        <h3 className={styles['dropdown__popular-title']}>Часто ищут</h3>
        <ul className={styles['dropdown__popular-list']}>
          {popularList}
        </ul>
      </div>
    </div>
  );

  return (
    <div className={styles.dropdown}>
      <div className="container">
        {data && data.length > 0 ?
          <ul className={styles['dropdown__result-list']}>
            {data.map(item => (
              <li key={item.id} className={styles['dropdown__result-item']}>
                <SearchDropdownCard dataProduct={item} />
              </li>
            ))}
          </ul>
          : <p className={styles['dropdown__result-empty']}>По вашему запросу ничего не найдено</p>
        }
      </div>
    </div>
  );
};
