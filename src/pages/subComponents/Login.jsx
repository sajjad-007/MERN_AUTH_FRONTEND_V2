import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Context } from '../../main';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { axiosInstance } from '../../axiosinstance';
const Login = () => {
  const {
    user,
    setUser,
    isLoading,
    setIsLoading,
    setIsAuthenticated,
    isAuthenticated,
  } = useContext(Context);

  const navigateTo = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //if a user is already authenticated then don't show this page
  const handleSubmit = e => {
    e.preventDefault();
  };
  // handle user submit
  const hanldeLoginUser = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    try {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(true);
      const response = await axiosInstance.post('/login', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.statusText === 'OK') {
        setIsAuthenticated(true);
        toast.success(response?.data?.message);
        setTimeout(() => {
          setUser(response?.data?.user);
          setIsAuthenticated(true);
          navigateTo('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Error from login page', error);
      toast.error(error?.response?.data?.message);
      setIsLoading(false);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo('/');
    }
  }, []);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-name">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={e => setEmail(e.target.value)}
                placeholder="youremail@gmai.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-username">
                <p>Password</p>
                <Link
                  to="/forgot/password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            {isLoading ? (
              <Button size="sm" disabled>
                <Loader2Icon className="animate-spin" />
                Please wait..
              </Button>
            ) : (
              <Button
                type="submit"
                className="cursor-pointer"
                onClick={hanldeLoginUser}
              >
                Sign Up
              </Button>
            )}
          </CardFooter>
        </form>
        <span>Don't have an account? Sign up first</span>
      </Card>
    </div>
  );
};

export default Login;
