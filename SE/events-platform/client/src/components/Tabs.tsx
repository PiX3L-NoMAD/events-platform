interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  currentTab: string;
  onChange: (tabId: string) => void;
}

export default function Tabs({
  tabs,
  currentTab,
  onChange,
}: TabsProps) {
  return (
    <div className='border-b border-[var(--color-muted-light)] mb-6'>
      <nav className='flex space-x-4'>
        {tabs.map(({ id, label }) => {
          const isActive = id === currentTab;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`pb-2 text-sm font-medium focus:outline-none ${
                isActive
                  ? 'border-b-2 border-[var(--color-accent)] text-[var(--color-primary)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'
              }`}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
