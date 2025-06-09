import SearchBar from './SearchBar';

export default function HeroBanner({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  return (
    <section className='relative bg-[var(--color-primary)] text-white md:p-20 p-8 mb-8'>
      <div className='max-w-3xl mx-auto text-center space-y-4 px-4'>
        <h1 className='md:text-4xl text-3xl font-bold'>
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
