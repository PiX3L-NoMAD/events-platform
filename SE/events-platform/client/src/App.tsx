import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import EventListPage from './pages/EventListPage';
import EventDetailPage from './pages/EventDetailPage';
import Header from './components/Header';
import { FilterProvider } from './contexts/FilterContext';

export default function App() {
  return (
    <FilterProvider>
      <div className='min-h-screen bg-gray-50'>
        <Header />

        {/* add top padding equal to header height */}
        <div className='pt-14'>
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
      </div>
    </FilterProvider>
  );
}
