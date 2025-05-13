import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '../api/axios';
import type { Event } from '../types';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [email, setEmail] = useState('');
  const [signupSuccess, setSignupSuccess] =
    useState(false);
  const qc = useQueryClient();

  const {
    data: evt,
    isLoading,
    isError,
  } = useQuery<Event>({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await api.get<Event>(
        `/events/${id}`
      );
      return res.data;
    },
    enabled: Boolean(id),
  });

  const signupMutation = useMutation({
    mutationFn: (userEmail: string) =>
      api.post('/signup', {
        eventId: id,
        userEmail,
      }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['event', id],
      });
      setSignupSuccess(true);
    },
  });

  function addToGoogleCalendar(evt: Event) {
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
      <div className='p-8 text-center'>
        Loading event…
      </div>
    );
  if (isError || !evt)
    return (
      <div className='p-8 text-center text-red-600'>
        Event not found
      </div>
    );

  return (
    <div className='p-8 max-w-3xl mx-auto bg-white rounded-lg shadow'>
      {/* Event info... */}
      <h1 className='text-2xl font-bold'>
        {evt.title}
      </h1>
      <p className='mt-2 text-gray-600'>
        {new Date(evt.datetime).toLocaleString()}
      </p>
      <p className='mt-1 text-gray-600'>
        {evt.location}
      </p>
      <p className='mt-4'>{evt.description}</p>

      {/* Attendees */}
      <div className='mt-6'>
        <h2 className='font-semibold'>
          Attendees: {evt.signups?.length ?? 0}
        </h2>
        {(evt.signups ?? []).map((s) => (
          <p
            key={s.id}
            className='text-sm text-gray-700'
          >
            • {s.user?.email ?? 'Unknown'}
          </p>
        ))}
      </div>

      {/* Signup / Confirmation UI */}
      {signupSuccess ? (
        <div className='mt-4 space-y-2'>
          <p className='text-green-600'>
            You’re all signed up!
          </p>
          <button
            onClick={() =>
              addToGoogleCalendar(evt)
            }
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Add to Google Calendar
          </button>
        </div>
      ) : (
        <form
          className='mt-6 flex gap-2'
          onSubmit={(e) => {
            e.preventDefault();
            signupMutation.mutate(email);
          }}
        >
          <input
            type='email'
            required
            placeholder='Your email'
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className='flex-grow px-4 py-2 border rounded focus:outline-none focus:ring'
          />
          <button
            type='submit'
            disabled={
              signupMutation.status === 'pending'
            }
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50'
          >
            {signupMutation.status === 'pending'
              ? 'Signing up…'
              : 'Sign up'}
          </button>
          {signupMutation.status === 'error' && (
            <p className='mt-2 text-sm text-red-600'>
              Signup failed. Try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
