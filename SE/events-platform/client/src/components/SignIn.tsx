import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../api/firebase';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Navigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<
    string | null
  >(null);
  const [isSigningUp, setIsSigningUp] =
    useState(false);
  const [success, setSuccess] = useState<
    string | null
  >(null);

  const handleAuth = async () => {
    try {
      if (isSigningUp) {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setSuccess(
          'Account created! You can now sign in.'
        );
        setEmail('');
        setPassword('');
        setIsSigningUp(false);
      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        await auth.currentUser?.getIdToken(true);
        setSuccess('Signed in successfully!');
      }
      setError(null);
    } catch (err: any) {
      setError(
        err.message || 'Authentication failed.'
      );
    }
  };

  if (success) return <Navigate to='/events' />;

  return (
    <div className='max-w-sm mx-auto mt-24 p-[2px] rounded-xl bg-gradient-to-br from-teal-300 to-sky-500 shadow-lg'>
      <div className='p-6 bg-white rounded-xl space-y-4'>
        <h1 className='text-2xl font-bold text-center'>
          {isSigningUp ? 'Sign Up' : 'Sign In'}
        </h1>

        {success && (
          <p className='text-green-600 text-sm text-center'>
            {success}
          </p>
        )}

        {error && (
          <p className='text-red-600 text-sm text-center'>
            {error}
          </p>
        )}

        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <Button
          className='w-full'
          onClick={handleAuth}
          disabled={!email || !password}
        >
          {isSigningUp
            ? 'Create Account'
            : 'Sign In'}
        </Button>

        <p className='text-sm text-center text-gray-600'>
          {isSigningUp
            ? 'Already have an account?'
            : "Don't have an account?"}{' '}
          <button
            onClick={() =>
              setIsSigningUp(!isSigningUp)
            }
            className='text-blue-600 underline hover:text-blue-800 transition'
          >
            {isSigningUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
