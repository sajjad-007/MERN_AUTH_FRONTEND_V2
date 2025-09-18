import React, { useContext, useState } from 'react';
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

const Otp = () => {
  const [value, setValue] = useState('');
  const { email, phoneNumber } = useParams();
  const { user, setUser, isLoading, setIsLoading } = useContext(Context);
  const navigateTo = useNavigate();

  //post otp to server
  const handleOtp = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('otp', value);
    try {
      setIsLoading(true);
      const response = await axios.post(
        'http://localhost:4000/api/v1/user/otp-verify',
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
        // loading false
        setIsLoading(false);
        // redireceting to login page
        setTimeout(() => {
          navigateTo('/auth');
        }, 2000);
      }
      console.log(response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error('Error from otp-verification', error);
      setIsLoading(false);
    }
  };
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
        )  :  (
          <Button
            type="submit"
            className="w-[100px] cursor-pointer"
            onClick={handleOtp}
          >
            Verify OTP
          </Button>
        )}

        {/* <Button size="sm" disabled>
          <Loader2Icon className="animate-spin" />
          Please wait..
        </Button> */}
      </div>
    </div>
  );
};

export default Otp;
