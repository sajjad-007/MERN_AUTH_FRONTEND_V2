import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Context } from '../main';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'react-toastify';
import { axiosInstance } from '../axiosinstance';

const ForgotPassword = () => {
  const { isLoading, setIsLoading, isAuthenticated } = useContext(Context);
  const [email, setEmail] = useState(null);
  const handleForgotPass = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        '/forgot/password',
        { email },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response) {
        toast.success(response?.data?.message);
        console.log(response);
      }
    } catch (error) {
      console.error('error from user registration', error);
      toast.error(error?.response?.data?.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setEmail('');
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo('/');
    }
  }, [isAuthenticated]);
  return (
    <div className="h-screen  flex items-center justify-center ">
      <Card className="sm-w-[300px] w-[500px]">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address to receive a password reset token.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <Label htmlFor="tabs-demo-name">
              <p>Email</p>
              <Link
                to="/auth"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Remember your password?
              </Link>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          {isLoading ? (
            <Button className="w-full text-[15px]" disabled>
              <Loader2Icon className="animate-spin" />
              Please wait..
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={handleForgotPass}
              className="w-full text-[15px] cursor-pointer"
            >
              Sign Up
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
