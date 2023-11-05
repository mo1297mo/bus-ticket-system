
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import TicketCancel from './components/TicketCancel';
// ... import other components

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-content">
          <Routes>
            <Route path="/" element={<BookingForm />} />
            <Route path="/cancel" element={<TicketCancel />} />
            {/* 
                Add more routes here as you develop more components.
                For example, if you create BusSelection and TicketBooking components:
                <Route path="/buses/:routeId" element={<BusSelection />} />
                <Route path="/book/:busId" element={<TicketBooking />} />
            */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
