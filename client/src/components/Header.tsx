import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiChevronDown,
} from 'react-icons/fi';
import CategoryNav from './CategoryNav';
import { useFilters } from '../contexts/FilterContext';
import logo from '../assets/eventify-logo.png';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../api/firebase';

export default function Header() {
  const { role, loading } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategories, setShowCategories] =
    useState(false);
  const { category, setCategory } = useFilters();

  function handleCategory(cat: string) {
    setCategory(cat);
    setMenuOpen(false);
  }

  if (loading) return <div>Loading events…</div>;

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
          className='h-24 md:h-48 hover:cursor-pointer hover:opacity-80 transition'
          onClick={() => navigate('/events')}
        />
        <div className='hidden md:flex items-center gap-3'>
          {role === 'staff' ? (
            <>
              <Button
                className='bg-blue-600 text-white hover:bg-blue-700'
                onClick={() =>
                  navigate('/events/new')
                }
              >
                Create Event
              </Button>
              <Button
                className='bg-gray-200 text-gray-800 hover:bg-gray-300'
                onClick={async () => {
                  await signOut(auth);
                  navigate('/events');
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate('/signin')}
            >
              Staff Portal
            </Button>
          )}
        </div>

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
          onClick={() =>
            setShowCategories((o) => !o)
          }
          className='hidden md:flex items-center space-x-1 p-2 focus:outline-none focus:ring'
        >
          <span className='text-[var(--color-primary)] font-medium'>
            Categories
          </span>
          <FiChevronDown
            size={20}
            className={
              showCategories
                ? 'transform rotate-180 transition'
                : 'transition'
            }
          />
        </button>
      </div>

      {showCategories && (
        <div className='hidden md:block bg-white border-t border-[var(--color-muted-light)] shadow-sm'>
          <CategoryNav
            value={category}
            onChange={handleCategory}
          />
        </div>
      )}

      {/* dropdown panel */}
      {menuOpen && (
        <div className='p-4 space-y-2 md:hidden'>
          {role === 'staff' ? (
            <>
              <Button
                className='w-full bg-gray-200 text-gray-800 hover:bg-gray-300'
                onClick={() => {
                  navigate('/events/new');
                  setMenuOpen(false);
                }}
              >
                Create Event
              </Button>
              <Button
                className='w-full bg-gray-200 text-gray-800 hover:bg-gray-300'
                onClick={async () => {
                  await signOut(auth);
                  navigate('/events');
                  setMenuOpen(false);
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <Button
              className='w-full bg-gray-200 text-gray-800 hover:bg-gray-300'
              onClick={() => {
                navigate('/signin');
                setMenuOpen(false);
              }}
            >
              Staff Portal
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
