import {
  useParams,
  useNavigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '../api/axios';
import { auth } from '../api/firebase';
import type { Event } from '../types';
import Tabs from '../components/Tabs';
import SocialShare from '../components/SocialShare';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

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
  return `https://picsum.photos/seed/${seed}/800/400`;
}
function maskEmail(email: string) {
  const [user, domain] = email.split('@');
  return user[0] + '***@' + domain;
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] =
    useState('details');
  const [signedUp, setSignedUp] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const qc = useQueryClient();
  const [userRole, setUserRole] = useState<
    string | null
  >(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  const {
    data: evt,
    isLoading,
    isError,
  } = useQuery<Event>({
    queryKey: ['event', id],
    queryFn: () =>
      api
        .get(`api/events/${id}`)
        .then((r) => r.data),
    enabled: Boolean(id),
  });

  useEffect(() => {
    let isMounted = true;

    if (evt) {
      const seed = makeSeed(evt.title);
      setImgSrc(
        evt.imageUrl?.trim() || picsumUrl(seed)
      );
    }

    auth.currentUser
      ?.getIdTokenResult()
      .then((res) => {
        if (isMounted) {
          setUserRole(
            typeof res.claims.role === 'string'
              ? res.claims.role
              : null
          );
        }
      });

    return () => {
      isMounted = false;
    };
  }, [evt]);

  const signupMutation = useMutation({
    mutationFn: () =>
      api.post('api/signup', {
        eventId: id,
        userEmail: form.email,
        userName: form.name,
      }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['event', id],
      });
      setSignedUp(true);
      setForm({ name: '', email: '' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      api.delete(`/api/events/${id}`),
    onSuccess: () => {
      navigate('/');
    },
  });

  function handleSignupSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();
    signupMutation.mutate();
  }

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
    <div className='pt-6 pb-32 px-4 md:px-0 max-w-3xl mx-auto'>
      <div className='w-full h-56 md:h-80 mb-6 overflow-hidden rounded-lg'>
        <img
          src={imgSrc}
          alt={evt.title}
          className='w-full h-full object-cover'
          onError={() =>
            setImgSrc(
              picsumUrl(makeSeed(evt.title))
            )
          }
        />
      </div>

      <h1 className='text-2xl md:text-4xl font-bold mb-2 text-center sm:text-left'>
        {evt.title}
      </h1>
      <p className='text-[var(--color-muted)] mb-4 sm:mb-6 text-center sm:text-left'>
        {new Date(evt.datetime).toLocaleString()}
      </p>

      {userRole === 'staff' && (
        <div className='mb-6 flex flex-wrap gap-3'>
          <Button
            onClick={() =>
              navigate(`/events/${id}/edit`)
            }
          >
            Edit Event
          </Button>
          <button
            className='text-sm text-gray-500 hover:text-red-600 underline underline-offset-4'
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to delete this event?'
                )
              ) {
                deleteMutation.mutate();
              }
            }}
          >
            Delete Event
          </button>
        </div>
      )}

      <Tabs
        tabs={tabs}
        currentTab={currentTab}
        onChange={setCurrentTab}
      />

      {currentTab === 'details' && (
        <p className='mb-6'>{evt.description}</p>
      )}

      {currentTab === 'attendees' && (
        <div className='mb-6 space-y-2 text-sm'>
          {(evt.signups || []).map((s) => (
            <div key={s.id}>
              {s.user?.name || '(No name)'} —{' '}
              {userRole === 'staff'
                ? s.user?.email
                : s.user?.email
                ? maskEmail(s.user.email)
                : 'unknown'}
            </div>
          ))}
        </div>
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

      {!signedUp && (
        <div className='mt-10 border-t pt-6'>
          <h3 className='text-lg font-semibold mb-4 text-center'>
            To sign up for this event, enter your
            name and email:
          </h3>
          <form
            onSubmit={handleSignupSubmit}
            className='flex flex-col sm:flex-row items-center gap-4 justify-center px-10'
          >
            <Input
              type='text'
              name='name'
              placeholder='Your name'
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  name: e.target.value,
                }))
              }
              required
              className='w-full sm:w-auto'
            />
            <Input
              type='email'
              name='email'
              placeholder='Your email'
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  email: e.target.value,
                }))
              }
              required
              className='w-full sm:w-auto'
            />
            <Button
              type='submit'
              className='whitespace-nowrap w-full sm:w-auto'
            >
              Sign Up
            </Button>
          </form>
        </div>
      )}

      {signedUp && (
        <div className='mt-8 flex justify-center'>
          <Button onClick={addToGoogleCalendar}>
            Add to Google Calendar
          </Button>
        </div>
      )}

      <div className='mt-4 flex justify-center'>
        <SocialShare
          url={window.location.href}
          title={evt.title}
        />
      </div>
    </div>
  );
}
