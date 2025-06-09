import { api } from '../api/axios';
import { useQuery } from '@tanstack/react-query';
import type { Event } from '../types';
import { EventCard } from '../components/EventCard';
import { SkeletonCard } from '../components/SkeletonCard';
import HeroBanner from '../components/HeroBanner';
import CategoryNav from '../components/CategoryNav';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { useFilters } from '../contexts/FilterContext';

export default function EventListPage() {
  const navigate = useNavigate();
  const { role, loading } = useAuth();
  const {
    search,
    setSearch,
    category,
    setCategory,
  } = useFilters();

  const {
    data: events,
    isLoading: queryLoading,
    isError,
  } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: () =>
      api.get('/api/events').then((r) => r.data),
  });

  const filteredEvents = events?.filter((evt) => {
    const matchesCategory =
      category === 'All' ||
      evt.category.toLowerCase() ===
        category.toLowerCase();
    const matchesSearch =
      evt.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      evt.description
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      evt.location
        .toLowerCase()
        .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function handleSearch(q: string) {
    setSearch(q);
    setCategory('All'); // optional: reset to show all categories when searching
  }

  function handleCategory(cat: string) {
    setCategory(cat);
  }

  if (loading || queryLoading) {
    return (
      <div className='p-8 max-w-7xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError || !events) {
    return (
      <div className='p-8 text-center text-[var(--color-muted)]'>
        Failed to load events — please try again.
      </div>
    );
  }

  return (
    <main className='p-8 max-w-7xl mx-auto'>
      <HeroBanner onSearch={handleSearch} />
      {role === 'staff' && (
        <div className='mb-4 text-right'>
          <Button
            className='bg-blue-600 text-white hover:bg-blue-700'
            onClick={() =>
              navigate('/events/new')
            }
          >
            Create Event
          </Button>
        </div>
      )}
      <CategoryNav
        value={category}
        onChange={handleCategory}
      />
      <p className='text-sm text-gray-500 mb-4'>
        Showing {filteredEvents?.length ?? 0}{' '}
        result(s) for “{search}” in category “
        {category}”
      </p>
      <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {filteredEvents?.map((evt) => (
          <EventCard
            key={evt.id}
            evt={evt}
          />
        ))}
      </div>
    </main>
  );
}
