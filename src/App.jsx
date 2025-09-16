import './App.css';
import { Button } from './components/ui/button';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { ThemeProvider } from './components/theme-provider';
import Auth from './pages/Auth';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Otp from './pages/Otp';
import InvalidRoutes from './InvalidRoutes';
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot/password" element={<ForgotPassword />} />
            <Route path="/reset/password/:token" element={<ResetPassword />} />
            <Route path="/otp-verify/:email/:phoneNumber" element={<Otp />} />
            <Route path="*" element={<InvalidRoutes />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
