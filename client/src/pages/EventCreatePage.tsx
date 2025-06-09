import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
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

export default function EventCreatePage() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] =
    useState('details');

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    datetime: '',
    imageUrl: '',
    category: 'Music',
  });

  const [imgSrc, setImgSrc] = useState('');

  const createEvent = useMutation({
    mutationFn: (newEvent: typeof form) =>
      api.post('/api/events', newEvent),
    onSuccess: (res) => {
      navigate(`/events/${res.data.event.id}`);
    },
    onError: () => {
      alert('Failed to create event.');
    },
  });

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
    if (name === 'title') {
      const seed = makeSeed(value);
      setImgSrc(
        form.imageUrl.trim() || picsumUrl(seed)
      );
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createEvent.mutate(form);
  }

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'map', label: 'Map' },
  ];

  return (
    <div className='pt-6 pb-32 px-4 sm:px-6 md:px-0 max-w-3xl mx-auto'>
      <div className='w-full h-56 sm:h-64 md:h-80 mb-6 overflow-hidden rounded-lg'>
        {imgSrc && (
          <img
            src={imgSrc}
            alt={form.title || 'Event'}
            className='w-full h-full object-cover'
            onError={() =>
              setImgSrc(
                picsumUrl(makeSeed(form.title))
              )
            }
          />
        )}
      </div>

      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center sm:text-left'>
        Create Event
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
            value={form.datetime}
            onChange={handleChange}
            required
          />
          <Input
            name='imageUrl'
            value={form.imageUrl}
            onChange={handleChange}
            placeholder='Image URL (optional)'
          />
          <label className='block'>
            <span className='text-sm font-medium'>
              Category
            </span>
            <select
              name='category'
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  category: e.target.value,
                }))
              }
              required
              className='mt-1 block w-full rounded-[var(--radius-lg)] border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-[var(--color-accent)]'
            >
              <option value='Music'>Music</option>
              <option value='Sports'>
                Sports
              </option>
              <option value='Talks'>Talks</option>
              <option value='Workshops'>
                Workshops
              </option>
              <option value='Wellness'>
                Wellness
              </option>
            </select>
          </label>
          <Button
            type='submit'
            className='bg-blue-600 text-white hover:bg-blue-700'
          >
            Create Event
          </Button>
        </form>
      )}

      {currentTab === 'map' && form.location && (
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
