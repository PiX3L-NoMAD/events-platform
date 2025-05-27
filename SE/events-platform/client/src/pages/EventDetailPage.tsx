import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '../api/axios';
import type { Event } from '../types';
import Tabs from '../components/Tabs';
import StickyActionBar from '../components/StickyActionBar';
import SocialShare from '../components/SocialShare';

// Helper to generate a URL-safe seed from the title
function makeSeed(str: string): string {
  return encodeURIComponent(
    str
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  );
}

// Picsum fallback URL: 800×400 for detail hero
function picsumUrl(seed: string) {
  return `https://picsum.photos/seed/${seed}/800/400`;
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [currentTab, setCurrentTab] =
    useState('details');
  const [signedUp, setSignedUp] = useState(false);
  const qc = useQueryClient();

  const {
    data: evt,
    isLoading,
    isError,
  } = useQuery<Event>({
    queryKey: ['event', id],
    queryFn: () =>
      api
        .get(`/events/${id}`)
        .then((r) => r.data),
    enabled: Boolean(id),
  });

  // Manage hero image src & fallback
  const [imgSrc, setImgSrc] =
    useState<string>('');
  if (evt && !imgSrc) {
    // initialize once when evt loads
    const seed = makeSeed(evt.title);
    setImgSrc(
      evt.imageUrl?.trim() || picsumUrl(seed)
    );
  }

  const signupMutation = useMutation({
    mutationFn: (email: string) =>
      api.post('/signup', {
        eventId: id,
        userEmail: email,
      }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['event', id],
      });
      setSignedUp(true);
    },
  });

  function addToGoogleCalendar() {
    if (!evt) return;
    const start = new Date(evt.datetime)
      .toISOString()
      .replace(/-|:|\.\d+/g, '');
    const url = new URL(
      'https://www.google.com/calendar/render'
    );
    url.searchParams.set('action', 'TEMPLATE');
    url.searchParams.set('text', evt.title);
    url.searchParams.set(
      'details',
      evt.description
    );
    url.searchParams.set(
      'location',
      evt.location
    );
    url.searchParams.set(
      'dates',
      `${start}/${start}`
    );
    window.open(url.toString(), '_blank');
  }

  if (isLoading)
    return (
      <div className='p-4 text-center'>
        Loading event…
      </div>
    );
  if (isError || !evt)
    return (
      <div className='p-4 text-center text-[var(--color-muted)]'>
        Event not found
      </div>
    );

  const tabs = [
    { id: 'details', label: 'Details' },
    {
      id: 'attendees',
      label: `Attendees (${
        evt.signups?.length || 0
      })`,
    },
    { id: 'map', label: 'Map' },
  ];

  return (
    <div className='pt-6 pb-32 px-4 sm:px-6 md:px-0 max-w-3xl mx-auto'>
      {/* Hero Image */}
      <div className='w-full h-56 sm:h-64 md:h-80 mb-6 overflow-hidden rounded-lg'>
        <img
          src={imgSrc}
          alt={evt.title}
          className='w-full h-full object-cover'
          onError={() => {
            // swap to picsum if original fails
            const seed = makeSeed(evt.title);
            setImgSrc(picsumUrl(seed));
          }}
        />
      </div>

      {/* Title & Meta */}
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center sm:text-left'>
        {evt.title}
      </h1>
      <p className='text-[var(--color-muted)] mb-4 sm:mb-6 text-center sm:text-left'>
        {new Date(evt.datetime).toLocaleString()}
      </p>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        currentTab={currentTab}
        onChange={setCurrentTab}
      />

      {/* Tab Panels */}
      {currentTab === 'details' && (
        <p className='mb-6'>{evt.description}</p>
      )}

      {currentTab === 'attendees' && (
        <ul className='space-y-1 mb-6'>
          {(evt.signups || []).map((s) => (
            <li
              key={s.id}
              className='text-sm'
            >
              • {s.user?.email || 'Unknown'}
            </li>
          ))}
        </ul>
      )}

      {currentTab === 'map' && (
        <div className='mb-6'>
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              evt.location
            )}&output=embed`}
            className='w-full h-56 sm:h-64 rounded-[var(--radius-lg)]'
          />
        </div>
      )}

      {/* Centered Social Share */}
      <div className='mt-8 flex justify-center'>
        <SocialShare
          url={window.location.href}
          title={evt.title}
        />
      </div>

      {/* Sticky bottom bar */}
      <StickyActionBar
        event={evt}
        signedUp={signedUp}
        onSignUp={(email) =>
          signupMutation.mutate(email)
        }
        onAddToCalendar={addToGoogleCalendar}
      />
    </div>
  );
}
