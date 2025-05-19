import { useState } from 'react';
import {
  FiMenu,
  FiX,
  FiChevronDown,
} from 'react-icons/fi';
import CategoryNav from './CategoryNav';
import { useFilters } from '../contexts/FilterContext';
import logo from '../assets/eventify-logo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { category, setCategory } = useFilters();

  function handleCategory(cat: string) {
    setCategory(cat);
    setMenuOpen(false);
  }

  return (
    <header className='fixed top-0 inset-x-0 z-50 bg-white shadow-sm'>
      <div
        className='max-w-7xl mx-auto flex items-center justify-between 
                      px-5 md:px-6 
                      h-16 md:h-20'
      >
        <img
          src={logo}
          alt='Eventify'
          className='h-24 md:h-48'
        />

        {/* mobile: hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className='md:hidden p-2 focus:outline-none focus:ring'
        >
          {menuOpen ? (
            <FiX size={24} />
          ) : (
            <FiMenu size={24} />
          )}
        </button>

        {/* md+: Categories dropdown trigger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className='
            hidden md:flex items-center space-x-1
            p-2 focus:outline-none focus:ring
          '
        >
          <span className='text-[var(--color-primary)] font-medium'>
            Categories
          </span>
          <FiChevronDown
            size={20}
            className={
              menuOpen
                ? 'transform rotate-180 transition'
                : 'transition'
            }
          />
        </button>
      </div>

      {/* dropdown panel */}
      {menuOpen && (
        <div
          className='
          bg-white border-t border-[var(--color-muted-light)] shadow-sm
          md:absolute md:top-full md:left-0 md:w-full
        '
        >
          <CategoryNav
            value={category}
            onChange={handleCategory}
          />
        </div>
      )}
    </header>
  );
}
