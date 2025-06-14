import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { RequireStaff } from './components/RequireStaff';
import EventListPage from './pages/EventListPage';
import EventDetailPage from './pages/EventDetailPage';
import SignIn from './components/SignIn';
import Header from './components/Header';
import EventEditPage from './pages/EventEditPage';
import EventCreatePage from './pages/EventCreatePage';

export default function App() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <div className='pt-14'>
        <Routes>
          <Route
            path='/signin'
            element={<SignIn />}
          />
          <Route
            path='/'
            element={<EventListPage />}
          />
          <Route
            path='/events'
            element={<EventListPage />}
          />
          <Route
            path='/events/:id'
            element={<EventDetailPage />}
          />
          <Route
            path='/events/:id/edit'
            element={
              <RequireStaff>
                <EventEditPage />
              </RequireStaff>
            }
          />
          <Route
            path='/events/new'
            element={
              <RequireStaff>
                <EventCreatePage />
              </RequireStaff>
            }
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
    </div>
  );
}
