import styles from './SearchBar.module.scss';

import { useEffect, useRef, useState } from 'react';
import { SearchDropdown } from '../SearchDropdown';
import SearchIcon from '@/assets/serach-icon.svg?react';
import { useFetchFilterProducts } from '@/shared/hooks/useFetchData';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useUnifiedQueryState } from '@/shared/hooks/useUnifiedQueryState';
import { Product, ProductFilterResponse } from '@/shared/types/products';

export const SearchBar = () => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const dataQuery = useFetchFilterProducts({per_page: 8, search: useDebounce(value, 400)});
  const unifiedDataQuery = useUnifiedQueryState<ProductFilterResponse, Product>(
    dataQuery,
    (data) => data.products,
  );

  const handleFocus = () => {
    inputRef.current?.focus();
    setIsFocus(true);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setValue('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setIsFocus(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return(
    <search className={styles.search} ref={boxRef} role='search' onClick={handleFocus}>
      <form className={styles.search__field}>
        <SearchIcon className={styles.search__icon}/>
        <input
          className={styles.search__input}
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => {setIsFocus(true);}}
          type='text'
          name='search'
          placeholder='Найти товары'
        />
        {value &&
          <button
            className={styles.search__btn}
            type='button'
            onClick={handleClear}
          >
            Очистить
          </button>
        }
      </form>

      {isFocus && <SearchDropdown dataQuery={unifiedDataQuery} searchValue={value} setSearchValue={setValue}/>}
    </search>
  );
};
