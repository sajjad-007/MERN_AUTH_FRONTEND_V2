import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Loader2Icon, LogOut } from 'lucide-react';
import { axiosInstance } from '../axiosinstance';

// import AboutAdmin from './subComponents/AboutAdmin';
import AboutAdminCard from './subComponents/AboutAdmin';
import AllUserSlider from './subComponents/AllUserSlider';
const Home = () => {
  const {
    setIsAuthenticated,
    isAuthenticated,
    setUser,
    user,
    isLoading,
    setIsLoading,
  } = useContext(Context);

  //Welcome Clebration
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = useNavigate();

  // Load auth state once on mount
  useEffect(() => {
    const storedUserValue = localStorage.getItem('user');
    if (storedUserValue) {
      setUser(JSON.parse(storedUserValue));
    }
    const storedAuthValue = localStorage.getItem('isAuthenticated');

    if (storedAuthValue === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  //if user is not authenticated means not logged in yet send him to login page

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo('/auth');
    }
  }, [isAuthenticated]);

  //handle user logout
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setIsAuthenticated(true);
      const response = await axiosInstance.post(
        '/logout',
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.statusText === 'OK') {
        setShowConfetti(false);
        toast.success(response?.data?.message);
        setIsLoading(false);
        setTimeout(() => {
          setUser(null);
          setIsAuthenticated(false);
          navigateTo('/auth');
          localStorage.removeItem('user');
          localStorage.removeItem('isAuthenticated');
        }, 2000);
      }
    } catch (error) {
      console.error('Error from logout', error);
      toast.error(error?.response?.data?.message);
      setIsLoading(false);
    } finally {
      setIsAuthenticated(false);
    }
  };

  return (
    <div>
      {/* if user exist then fire showConfetti otherwise not fire */}
      {user && showConfetti && <Confetti width={width} height={height} />}
      {isLoading ? (
        <Button
          size="sm"
          className="cursor-pointer absolute right-4 top-4 "
          disabled
        >
          <Loader2Icon className="animate-spin" />
          Please wait..
        </Button>
      ) : (
        <Button
          onClick={handleLogout}
          className="cursor-pointer absolute right-4 top-4 text-destructive bg-white"
        >
          <LogOut /> <span>Logout</span>
        </Button>
      )}

      <div className="w-full h-full flex flex-col gap-4 items-center justify-center mt-16">
        <Avatar className="h-32 w-32 object-cover">
          <AvatarImage
            src={user ? user?.profile?.secure_url : 'not found'}
            className="h-full w-full object-cover text-white"
            alt="not found"
          />
        </Avatar>

        {user ? (
          <div>
            <h1 className="text-5xl text-chart-2 font-bold capitalize">
              {user
                ? `Welcome, ${user?.fullName}`
                : 'Please Reload Your Browser'}
            </h1>
            <section className="py-10 ">
              <AboutAdminCard />
            </section>
          </div>
        ) : (
          <h1 className="text-5xl text-chart-3 font-bold">
            Please Reload Your Browser
          </h1>
        )}
      </div>
    </div>
  );
};

export default Home;
