import SearchBar from './SearchBar';

export default function HeroBanner({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
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
        <div className='mt-6'>
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
}
