
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import TicketCancel from './components/TicketCancel';
import PrintTicket from './components/PrintTicket';
import TicketValidator from './components/TicketValidator';
// ... import other components

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-content">
          <Routes>
            <Route path="/" element={<BookingForm />} />
            <Route path="/cancel" element={<TicketCancel />} />
            <Route path="/print-ticket" element={<PrintTicket />} />
            <Route path="/validate/:ticketID" element={<TicketValidator />} />

            {/* 
                Add more routes here as you develop more components.
            */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
