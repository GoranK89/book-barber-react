import BookingPage from './pages/BookingPage';
import SuccessPage from './pages/SuccessPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/book-barber-react" element={<BookingPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;
