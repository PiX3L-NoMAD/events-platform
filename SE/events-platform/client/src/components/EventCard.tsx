import { Link } from 'react-router-dom';
import type { Event } from '../types';

export function EventCard({
  evt,
}: {
  evt: Event;
}) {
  const date = new Date(evt.datetime);
  const day = date.getDate();
  const month = date
    .toLocaleString('default', { month: 'short' })
    .toUpperCase();

  return (
    <Link
      to={`/events/${evt.id}`}
      className='event-card block h-64 focus:outline-none'
      aria-label={`View details for ${evt.title}`}
    >
      {/* Background image */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: `url(${
            evt.imageUrl ?? '/placeholder.jpg'
          })`,
        }}
      />
      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black/30' />

      {/* Date badge */}
      <div className='date-badge'>
        <div className='flex flex-col items-center leading-none'>
          <span className='text-base'>{day}</span>
          <span className='text-xs'>{month}</span>
        </div>
      </div>

      {/* Title & meta */}
      <div className='absolute bottom-0 w-full p-4 text-white'>
        <h3 className='text-lg font-semibold'>
          {evt.title}
        </h3>
        <p className='text-sm'>{evt.location}</p>
      </div>
    </Link>
  );
}
