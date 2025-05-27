import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { Event } from '../types';

function makeSeed(str: string): string {
  return encodeURIComponent(
    str
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  );
}

function picsumUrl(seed: string) {
  return `https://picsum.photos/seed/${seed}/400/300`;
}

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

  const fullSeed = makeSeed(evt.title);
  const words = evt.title.trim().split(/\s+/);
  const secondSeed =
    words.length > 1
      ? makeSeed(words[1])
      : fullSeed;

  const candidates = [
    evt.imageUrl?.trim(), // 1) original URL
    picsumUrl(fullSeed), // 2) picsum seeded by full title
    picsumUrl(secondSeed), // 3) picsum seeded by second word
  ].filter(Boolean) as string[];

  // State holds our current src index into `candidates`
  const [idx, setIdx] = useState(0);

  // If the current src errors, bump to the next one (if any)
  function handleError() {
    if (idx < candidates.length - 1) {
      setIdx(idx + 1);
    }
  }

  return (
    <Link
      to={`/events/${evt.id}`}
      className='event-card block h-64 focus:outline-none relative overflow-hidden'
      aria-label={`View details for ${evt.title}`}
    >
      <img
        src={candidates[idx]}
        alt={evt.title}
        className='absolute inset-0 w-full h-full object-cover'
        onError={handleError}
      />

      {/* dark overlay */}
      <div className='absolute inset-0 bg-black/30' />

      {/* date badge */}
      <div className='date-badge'>
        <div className='flex flex-col items-center leading-none'>
          <span className='text-base'>{day}</span>
          <span className='text-xs'>{month}</span>
        </div>
      </div>

      {/* title & location */}
      <div className='absolute bottom-0 w-full p-4 text-white'>
        <h3 className='text-lg font-semibold truncate'>
          {evt.title}
        </h3>
        <p className='text-sm truncate'>
          {evt.location}
        </p>
      </div>
    </Link>
  );
}
