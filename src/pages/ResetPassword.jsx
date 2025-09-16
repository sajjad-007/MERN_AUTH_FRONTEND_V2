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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Link } from 'react-router-dom';

const ResetPassword = () => {
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
            <Input id="tabs-demo-current" type="password" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="tabs-demo-new">Confirm password</Label>
            <Input id="tabs-demo-new" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="cursor-pointer">
            Save password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
