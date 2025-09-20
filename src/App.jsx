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
function App() {
  const { setUser, setIsAuthenticated } = useContext(Context);
  //loggedIn User value
  useEffect(() => {
    const getUser = async () => {
      await axiosInstance
        .get('/getuser', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          const userData = res?.data?.user;
          setUser(userData);
          setIsAuthenticated(true);
          //When you refresh your browser it will logout your user automatically
          //because when you refresh your browser isAuthenticated value will be  false(default value)
          //so thats why we have to  store isAuthenticated value(true) in our loacalStorage and when user loggedin extract(parse) isAuthenticated value(true) and store it to the state
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(userData));
        })
        .catch(err => {
          console.error('error from getUser', err);
          toast.error(err?.res?.data?.message);
          setUser(null);
          setIsAuthenticated(false);
        });
    };
    getUser();
  }, []);
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
