import { useState } from 'react';
import type { FormEvent } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  defaultValue?: string;
}

export default function SearchBar({
  placeholder = 'Search events…',
  onSearch,
  defaultValue = '',
}: SearchBarProps) {
  const [value, setValue] =
    useState(defaultValue);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(value.trim());
    setValue('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-xl mx-auto flex'
    >
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className='
          flex-grow
          bg-white bg-opacity-90
          placeholder-gray-500 text-[var(--color-primary)]
          px-4 py-3
          rounded-[var(--radius-lg)]
          focus:outline-none focus:ring focus:ring-[var(--color-accent)]
          transition duration-150
        '
      />
      <button
        type='submit'
        className='btn-primary rounded-r-[var(--radius-lg)] mx-4'
      >
        Search
      </button>
    </form>
  );
}
