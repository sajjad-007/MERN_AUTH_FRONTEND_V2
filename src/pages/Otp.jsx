import React, { useContext, useEffect, useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowDown, Loader2Icon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Context } from '../main';
import { axiosInstance } from '../axiosinstance';

const Otp = () => {
  const [value, setValue] = useState('');
  const { email, phoneNumber } = useParams();
  const { user, setUser, isLoading, setIsLoading, isAuthenticated } =
    useContext(Context);
  const navigateTo = useNavigate();

  //post otp to server
  const handleOtp = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('otp', value);
    try {
      setIsLoading(true);
      const response = await axiosInstance.post('/otp-verify', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.statusText === 'OK') {
        toast.success(response?.data?.message);
        // loading false
        setIsLoading(false);
        setUser(response?.data);
        // redireceting to login page
        setTimeout(() => {
          navigateTo('/auth');
        }, 2000);
      }
    } catch (error) {
      console.error('Error from otp-verification', error);
      toast.error(error?.response?.data?.message);
      setIsLoading(false);
    }
  };
  //if a user is already authenticated then don't show this page
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo('/');
    }
  }, []);
  return (
    <div className="h-screen  flex items-center justify-center">
      <div className="flex flex-col gap-6 justify-center items-center">
        {/* this InputOTP field is a Shadcn ui component*/}
        <InputOTP
          className="sm-w-[350px] w-[500px]"
          maxLength={6}
          value={value}
          onChange={value => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot className="h-14 w-14 text-xl" index={0} />
            <InputOTPSlot className="h-14 w-14 text-xl" index={1} />
            <InputOTPSlot className="h-14 w-14 text-xl" index={2} />
            <InputOTPSlot className="h-14 w-14 text-xl" index={3} />
            <InputOTPSlot className="h-14 w-14 text-xl" index={4} />
          </InputOTPGroup>
        </InputOTP>
        {value === '' && !isLoading ? (
          <span className="text-lg font-bold text-destructive">
            Please enter your otp
          </span>
        ) : isLoading ? (
          <Button size="sm" disabled>
            <Loader2Icon className="animate-spin" />
            Please wait..
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-[100px] cursor-pointer"
            onClick={handleOtp}
          >
            Verify OTP
          </Button>
        )}
      </div>
    </div>
  );
};

export default Otp;
