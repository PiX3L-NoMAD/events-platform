import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface FilterContextValue {
  search: string;
  setSearch: (q: string) => void;
  category: string;
  setCategory: (c: string) => void;
}

const FilterContext =
  createContext<FilterContextValue | null>(null);

export function FilterProvider({
  children,
}: {
  children: ReactNode;
}) {
  const {
    search,
    setSearch,
    category,
    setCategory,
  } = useFilters();

  return (
    <FilterContext.Provider
      value={{
        search,
        setSearch,
        category,
        setCategory,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error(
      'useFilters must be used within FilterProvider'
    );
  }
  return ctx;
}
