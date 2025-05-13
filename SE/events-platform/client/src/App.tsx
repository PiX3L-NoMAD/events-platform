import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import EventListPage from './pages/EventListPage';
import EventDetailPage from './pages/EventDetailPage';

export default function App() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Routes>
        <Route
          path='/events'
          element={<EventListPage />}
        />
        <Route
          path='/events/:id'
          element={<EventDetailPage />}
        />
        <Route
          path='*'
          element={
            <Navigate
              to='/events'
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}
