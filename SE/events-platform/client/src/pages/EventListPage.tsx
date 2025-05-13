import { useQuery } from '@tanstack/react-query';
import { api } from '../api/axios';
import type { Event } from '../types';
import { Link } from 'react-router-dom';

export default function EventListPage() {
  const { data, isLoading, isError } = useQuery<
    Event[]
  >({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await api.get<Event[]>(
        '/events'
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className='p-8 text-center'>
        Loading events…
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className='p-8 text-center text-red-600'>
        Failed to load events
      </div>
    );
  }

  return (
    <div className='p-8 max-w-7xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {data.map((evt) => (
        <Link
          key={evt.id}
          to={`/events/${evt.id}`}
          className='block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg focus:outline-none focus:ring'
          aria-label={`View details for ${evt.title}`}
        >
          <h2 className='text-xl font-bold'>
            {evt.title}
          </h2>
          <p className='mt-1 text-sm text-gray-500'>
            {new Date(
              evt.datetime
            ).toLocaleString()}
          </p>
          <p className='mt-2 text-gray-700'>
            {evt.location}
          </p>
        </Link>
      ))}
    </div>
  );
}
