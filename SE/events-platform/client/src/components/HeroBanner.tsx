import { useState } from 'react';

export default function HeroBanner({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [q, setQ] = useState('');
  return (
    <section className='relative bg-[var(--color-primary)] text-white py-20 mb-8'>
      <div className='max-w-3xl mx-auto text-center space-y-4 px-4'>
        <h1 className='text-4xl font-bold'>
          Discover Your Next Event
        </h1>
        <p className='text-lg opacity-80'>
          Browse and sign up for events happening
          near you.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(q);
          }}
          className='mt-6 flex max-w-xl mx-auto'
        >
          <input
            type='text'
            placeholder='Search events…'
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className='flex-grow px-4 py-3 rounded-l-[var(--radius-lg)] text-gray-900 focus:outline-none'
          />
          <button
            type='submit'
            className='btn-primary rounded-r-[var(--radius-lg)]'
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
