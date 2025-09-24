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
import { toast, ToastContainer } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { axiosInstance } from './axiosinstance';
import { Context } from './main';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { setUser, setIsAuthenticated } = useContext(Context);
  //loggedIn User value
  useEffect(() => {
    // Clear any old localStorage data on mount
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    
    const getUser = async () => {
      try {
        const res = await axiosInstance.get('/getuser', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (res?.data?.user) {
          const userData = res.data.user;
          setUser(userData);
          setIsAuthenticated(true);
          // Only store in localStorage if we successfully got user data
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } catch (err) {
        console.error('error from getUser', err);
        // Clear any stale data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        // Don't show error toast on initial load if user is not authenticated
        if (err?.response?.status !== 401) {
          toast.error(err?.response?.data?.message || 'Failed to fetch user');
        }
      }
    };
    getUser();
  }, [setUser, setIsAuthenticated]);
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
          <ToastContainer theme="dark" />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
