const CATEGORIES = [
  'All',
  'Music',
  'Sports',
  'Talks',
  'Workshops',
  'Wellness',
];

export default function CategoryNav({
  value,
  onChange,
}: {
  value: string;
  onChange: (cat: string) => void;
}) {
  return (
    <nav className='overflow-x-auto py-4'>
      <ul className='inline-flex space-x-3 px-4'>
        {CATEGORIES.map((cat) => {
          const isActive = cat === value;
          return (
            <li key={cat}>
              <button
                onClick={() => onChange(cat)}
                className={`
                  px-4 py-2 rounded-[var(--radius-lg)] whitespace-nowrap
                  ${
                    isActive
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'bg-[var(--color-muted-light)] text-[var(--color-primary)]'
                  }
                  focus:outline-none focus:ring
                `}
              >
                {cat}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
