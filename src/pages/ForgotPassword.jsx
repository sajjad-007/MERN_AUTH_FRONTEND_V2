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
import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="h-screen  flex items-center justify-center ">
      <Card className="sm-w-[300px] w-[500px]">
        <CardHeader>
          <CardTitle>Reset Email</CardTitle>
          <CardDescription>Enter your email to get reset email</CardDescription>
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
              placeholder="enteremail@gmail.com"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="cursor-pointer">
            Send Email
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
