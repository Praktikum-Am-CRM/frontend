import { TextInput } from '@gravity-ui/uikit';
import { useEffect, useState } from 'react';
import { useActions } from '../../hooks/actions';
import useDebounce from '../../hooks/useDebounce';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);

  const { setSearch } = useActions();

  useEffect(() => {
    if (debouncedSearchText) {
      setSearch({ search: debouncedSearchText });
    } else {
      setSearch({ search: '' });
    }
  }, [debouncedSearchText]);

  return (
    <>
      <TextInput
        placeholder="Поиск по имени"
        size="xl"
        style={{ width: '400px' }}
        onChange={e => {
          setSearchText(e.target.value);
        }}
      />
    </>
  );
}
