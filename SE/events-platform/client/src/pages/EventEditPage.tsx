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
import type { Event } from '../types';
import Tabs from '../components/Tabs';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
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

export default function EventEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [currentTab, setCurrentTab] =
    useState('details');

  const {
    data: evt,
    isLoading,
    isError,
  } = useQuery<Event>({
    queryKey: ['event', id],
    queryFn: () =>
      api
        .get(`/api/events/${id}`)
        .then((r) => r.data),
    enabled: Boolean(id),
  });

  const updateEvent = useMutation({
    mutationFn: (updated: Partial<Event>) =>
      api.put(`/api/events/${id}`, updated),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['event', id],
      });
      navigate(`/events/${id}`);
    },
  });

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    datetime: '',
    imageUrl: '',
  });

  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (evt) {
      setForm({
        title: evt.title,
        description: evt.description,
        location: evt.location,
        datetime: evt.datetime,
        imageUrl: evt.imageUrl || '',
      });
      const seed = makeSeed(evt.title);
      setImgSrc(
        evt.imageUrl?.trim() || picsumUrl(seed)
      );
    }
  }, [evt]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateEvent.mutate(form);
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
    { id: 'map', label: 'Map' },
  ];

  return (
    <div className='pt-6 pb-32 px-4 sm:px-6 md:px-0 max-w-3xl mx-auto'>
      <div className='w-full h-56 sm:h-64 md:h-80 mb-6 overflow-hidden rounded-lg'>
        <img
          src={imgSrc}
          alt={form.title}
          className='w-full h-full object-cover'
          onError={() =>
            setImgSrc(
              picsumUrl(makeSeed(form.title))
            )
          }
        />
      </div>

      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center sm:text-left'>
        Edit Event
      </h1>

      <Tabs
        tabs={tabs}
        currentTab={currentTab}
        onChange={setCurrentTab}
      />

      {currentTab === 'details' && (
        <form
          onSubmit={handleSubmit}
          className='space-y-4 mb-8'
        >
          <Input
            name='title'
            value={form.title}
            onChange={handleChange}
            placeholder='Title'
            required
          />
          <Textarea
            name='description'
            value={form.description}
            onChange={handleChange}
            placeholder='Description'
            required
          />
          <Input
            name='location'
            value={form.location}
            onChange={handleChange}
            placeholder='Location'
            required
          />
          <Input
            type='datetime-local'
            name='datetime'
            value={form.datetime.slice(0, 16)}
            onChange={handleChange}
            required
          />
          <Input
            name='imageUrl'
            value={form.imageUrl}
            onChange={handleChange}
            placeholder='Image URL (optional)'
          />
          <Button
            type='submit'
            className='bg-blue-600 text-white hover:bg-blue-700'
          >
            Save Changes
          </Button>
        </form>
      )}

      {currentTab === 'map' && (
        <div className='mb-6'>
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              form.location
            )}&output=embed`}
            className='w-full h-56 sm:h-64 rounded-[var(--radius-lg)]'
          />
        </div>
      )}
    </div>
  );
}
