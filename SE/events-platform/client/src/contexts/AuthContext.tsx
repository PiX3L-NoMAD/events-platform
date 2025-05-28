import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  onAuthStateChanged,
  getIdTokenResult,
} from 'firebase/auth';
import type { ReactNode } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../api/firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  role: 'staff' | 'user' | null;
  loading: boolean;
}

const AuthContext =
  createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
  });

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<
    'staff' | 'user' | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (u) => {
        if (u) {
          setUser(u);
          const idTokenResult =
            await getIdTokenResult(u);
          console.log(
            'Token claims:',
            idTokenResult.claims
          );
          const role =
            (idTokenResult.claims.role as
              | 'staff'
              | 'user') || 'user';
          setRole(role);
        } else {
          setUser(null);
          setRole(null);
        }
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, role, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);
