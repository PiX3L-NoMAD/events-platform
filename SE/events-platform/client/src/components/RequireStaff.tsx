import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function RequireStaff({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, role, loading } = useAuth();

  if (loading) return <div>Loading…</div>;
  if (!user)
    return (
      <Navigate
        to='/signin'
        replace
      />
    );
  console.log('User role:', role);
  if (role !== 'staff')
    return (
      <Navigate
        to='/'
        replace
      />
    );

  return children;
}
