import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CloudUpload } from 'lucide-react';
import React, { useState } from 'react';

const Auth = () => {
  const [uploadImg, setUploadImg] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const handleUploadImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgPreview(reader.result);
      setUploadImg(file);
    };
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <Tabs
        defaultValue="login"
        className="flex w-full max-w-sm  flex-col gap-4"
      >
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        {/* login part */}
        <TabsContent value="login">
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
                <Label htmlFor="tabs-demo-username">Password</Label>
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
          </Card>
        </TabsContent>
        {/* signup part */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <Label htmlFor="picture">
                  <Avatar className="h-14 w-14">
                    {imgPreview ? (
                      <AvatarImage
                        src={imgPreview}
                        alt="not found"
                        className="h-full w-full bg-cover"
                      ></AvatarImage>
                    ) : (
                      <AvatarFallback>
                        <CloudUpload />
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Label>
                <Input
                  id="picture"
                  type="file"
                  onChange={handleUploadImage}
                  className="hidden"
                  required
                />
              </div>
              <CardDescription>Select image</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Jon Doe"
                  required
                />
              </div>
              {/* email part */}
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
              {/* phone number */}
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              {/* password */}
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  required
                />
              </div>
              {/* Account verrification method */}
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">
                  Account Verification Method
                </Label>
                <div className="flex gap-2">
                  <div className="flex gap-2">
                    <Checkbox id="email" />
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <div className="flex gap-2">
                    <Checkbox id="phoneNumber" />
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="cursor-pointer">
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
