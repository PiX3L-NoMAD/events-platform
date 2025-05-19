import type { Event } from '../types';

interface StickyActionBarProps {
  event: Event;
  signedUp: boolean;
  onSignUp: (email: string) => void;
  onAddToCalendar: () => void;
}

export default function StickyActionBar({
  //event,
  signedUp,
  onSignUp,
  onAddToCalendar,
}: StickyActionBarProps) {
  return (
    <div className='fixed bottom-0 inset-x-0 bg-white border-t border-[var(--color-muted-light)] p-4 shadow-lg flex justify-center'>
      {signedUp ? (
        <button
          onClick={onAddToCalendar}
          className='btn-primary px-6'
        >
          Add to Google Calendar
        </button>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form =
              e.target as HTMLFormElement;
            const input =
              form.email as HTMLInputElement;
            onSignUp(input.value);
          }}
          className='flex space-x-2'
        >
          <input
            name='email'
            type='email'
            required
            placeholder='Your email'
            className='px-4 py-2 border rounded-[var(--radius-lg)] focus:outline-none'
          />
          <button
            type='submit'
            className='btn-primary'
          >
            Sign up
          </button>
        </form>
      )}
    </div>
  );
}
