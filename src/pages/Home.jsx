import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Loader2Icon, LogOut, LogOutIcon } from 'lucide-react';
import { axiosInstance } from '../axiosinstance';
import { Skeleton } from '@/components/ui/skeleton';
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
    console.log(user);
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
      {/* {showConfetti && <Confetti width={width} height={height} />} */}
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

      <div className="w-full h-full flex flex-col gap-4 items-center justify-center my-20">
        <Avatar className="h-22 w-22 object-cover">
          <AvatarImage
            src={user ? user?.profile?.secure_url : 'not found'}
            className="h-full w-full object-cover text-white"
            alt="not found"
          />
        </Avatar>
        <h1 className="text-5xl text-chart-3 font-bold">
          Welcome {user?.fullName}
        </h1>
        {/* {user ? (
        ) : (
          'User not found'
        )} */}
      </div>

      {/* <Card className="w-full max-w-sm ">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card> */}
    </div>
  );
};

export default Home;
