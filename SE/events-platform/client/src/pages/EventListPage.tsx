import { useQuery } from '@tanstack/react-query';
import { api } from '../api/axios';
import type { Event } from '../types';
import { EventCard } from '../components/EventCard';
import { SkeletonCard } from '../components/SkeletonCard';
import HeroBanner from '../components/HeroBanner';
import CategoryNav from '../components/CategoryNav';
import { useState } from 'react';

export default function EventListPage() {
  const [search, setSearch] =
    useState<string>('');

  const [category, setCategory] =
    useState<string>('All');

  const { data, isLoading, isError } = useQuery<
    Event[]
  >({
    queryKey: ['events', search, category],
    queryFn: () =>
      api
        .get('/events', {
          params: {
            q: search,
            category:
              category !== 'All'
                ? category
                : undefined,
          },
        })
        .then((r) => r.data),
  });

  function handleSearch(q: string) {
    setSearch(q);
  }

  function handleCategory(cat: string) {
    setCategory(cat);
  }

  if (isLoading) {
    return (
      <div className='p-8 max-w-7xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className='p-8 text-center text-[var(--color-muted)]'>
        Failed to load events — please try again.
      </div>
    );
  }

  return (
    <main className='p-8 max-w-7xl mx-auto'>
      <HeroBanner onSearch={handleSearch} />
      <CategoryNav
        value={category}
        onChange={handleCategory}
      />
      <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {data.map((evt) => (
          <EventCard
            key={evt.id}
            evt={evt}
          />
        ))}
      </div>
    </main>
  );
}
