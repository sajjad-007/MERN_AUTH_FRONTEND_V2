import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const Login = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="tabs-demo-name">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
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
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="cursor-pointer">
            Login
          </Button>
        </CardFooter>
        <span>Don't have an account? Sign up first</span>
      </Card>
    </div>
  );
};

export default Login;
