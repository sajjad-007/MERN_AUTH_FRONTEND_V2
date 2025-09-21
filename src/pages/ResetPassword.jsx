import React, { useContext, useState } from 'react';
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
import { Loader2Icon } from 'lucide-react';
import { axiosInstance } from '../axiosinstance';
import { Context } from '../main';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const { isLoading, setIsLoading, isAuthenticated } = useContext(Context);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const { token } = useParams();

  const navigateTo = useNavigate();
  const handleResetPass = async () => {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `/reset/password/${token}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.statusText === 'OK') {
        toast.success(response?.data?.message);
        setTimeout(() => {
          navigateTo('/auth');
        }, 2000);
        console.log(response);
      }
    } catch (error) {
      console.error('error from user registration', error);
      toast.error(error?.response?.data?.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
    console.log(password);
    console.log(confirmPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo('/');
    }
  }, [isAuthenticated]);
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="sm-w-[300px] w-[500px]">
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password here.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="tabs-demo-current">New password</Label>
            <Input
              id="tabs-demo-current"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="tabs-demo-new">Confirm password</Label>
            <Input
              id="tabs-demo-new"
              type="password"
              name="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
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
              onClick={handleResetPass}
            >
              Reset Password
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
