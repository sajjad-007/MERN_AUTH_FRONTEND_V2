import React from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';

const Otp = () => {
  return (
    <div className="h-screen  flex items-center justify-center">
      <div className="flex flex-col gap-6 justify-center items-center">
        <InputOTP className="sm-w-[350px] w-[500px]" maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot className="h-14 w-14 text-xl" index={0} />
            <InputOTPSlot className="h-14 w-14 text-xl" index={1} />
            <InputOTPSlot className="h-14 w-14 text-xl" index={2} />
            <InputOTPSlot className="h-14 w-14 text-xl" index={3} />
            <InputOTPSlot className="h-14 w-14 text-xl" index={4} />
          </InputOTPGroup>
        </InputOTP>
        <Button className="w-[100px] cursor-pointer">Verify OTP</Button>
      </div>
    </div>
  );
};

export default Otp;
