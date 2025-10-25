import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import WelcomePage from './pages/WelcomePage';
import MainNavigation from './pages/MainNavigation';
import AccountSignIn from './pages/AccountSignIn';
import AccountSignUp from './pages/AccountSignUp';
import MobileSignUp from './pages/MobileSignUp';
import ForgotPassword from './pages/ForgotPassword';
import PhoneVerification from './pages/PhoneVerification';
import TalentProfileSetup from './pages/TalentProfileSetup';
import CreateEventPage from './pages/CreateEventPage';
import TalentDetailPage from './pages/TalentDetailPage';
import MyReservationsPage from './pages/MyReservationsPage';
import EventHistoryPage from './pages/EventHistoryPage';
import BookingPage from './pages/BookingPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FE5740',
    },
    background: {
      default: '#FFFFFF',
    },
    grey: {
      400: '#7C7C7C',
      100: '#F3F4F6',
      50: '#FFF7ED',
    },
    text: {
      primary: '#9A3413',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/signin" element={<AccountSignIn />} />
          <Route path="/signup" element={<AccountSignUp />} />
          <Route path="/signup-mobile" element={<MobileSignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/phone-verification" element={<PhoneVerification />} />
          <Route path="/talent-profile" element={<TalentProfileSetup />} />
          <Route path="/main" element={<MainNavigation fromLogin={true} />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/talent-detail" element={<TalentDetailPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/my-reservations" element={<MyReservationsPage />} />
          <Route path="/event-history" element={<EventHistoryPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;