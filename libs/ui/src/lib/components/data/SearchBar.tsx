import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { FC } from 'react';
import { debounce } from 'lodash';

export interface SearchBarProps {
  className?: string;
  onChange: (value: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onChange, className }) => {
  const debouncedFunc = debounce((value: string) => onChange(value), 500);

  return (
    <TextInput
      className={className}
      icon={<IconSearch />}
      onChange={(e) => debouncedFunc(e.target.value)}
    />
  );
};
