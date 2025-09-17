import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { CloudUpload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [uploadImg, setUploadImg] = useState('');
  const [imgPreview, setImgPreview] = useState('');

  const handleUploadImage = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgPreview(reader.result);
      setUploadImg(file);
    };
  };

  const handleUserRegister = async data => {
    data.phoneNumber = `+880${data.phoneNumber}`;

    const formData = new FormData();
    formData.append('image', uploadImg);
    formData.append('fullName', data.fullName);
    formData.append('email', data.email);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('password', data.password);
    formData.append('accountVerificationMethod', data.verificationMethod);

    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/user/register',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      console.log(response?.data?.message);
    } catch (error) {
      console.error('error from user registration', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUserRegister)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center">
            <Label htmlFor="image">
              <Avatar className="h-14 w-14">
                {imgPreview ? (
                  <AvatarImage
                    src={imgPreview}
                    alt="Preview"
                    className="h-full w-full bg-cover cursor-pointer"
                  />
                ) : (
                  <>
                    <AvatarFallback className="cursor-pointer h-full w-full">
                      <CloudUpload />
                    </AvatarFallback>
                    {errors.image && (
                      <p className="text-destructive text-sm">
                        {errors.image.message}
                      </p>
                    )}
                  </>
                )}
              </Avatar>
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*" //Only allow files that match the image MIME types (like .png, .jpg, .jpeg, .gif, .webp, etc.) to be selected in the file picker.
              className="hidden cursor-pointer"
              {...register('image', { required: 'Image is required' })}
              onChange={handleUploadImage}
            />
          </div>
          <CardDescription>Select image</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          {/* Full Name */}
          <div className="grid gap-3">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Jon Doe"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: { value: 2, message: 'Minimum 2 characters' },
                maxLength: { value: 20, message: 'Maximum 20 characters' },
              })}
            />
            {errors.fullName && (
              <p className="text-destructive text-sm">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@gmail.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email',
                },
              })}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="grid gap-3 relative">
            <Label htmlFor="phoneNumber">Phone Number</Label>

            <Input
              id="phoneNumber"
              type="text"
              placeholder="Enter your number"
              className="pl-16" // enough space for +880 + border
              {...register('phoneNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Enter a valid phone number (10 digits)',
                },
              })}
            />
            <span className="absolute left-2 top-9 text-sm font-semibold text-gray-600 border-r-2 pr-2">
              +880
            </span>

            {errors.phoneNumber && (
              <p className="text-destructive text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <p className="text-destructive text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Account Verification Method */}
          <div className="grid gap-3">
            <Label>Account Verification Method</Label>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Input
                  id="verificationEmail"
                  type="radio"
                  value="email"
                  className="h-5 w-5"
                  {...register('verificationMethod', {
                    required: 'Select a verification method',
                  })}
                />
                <Label htmlFor="verificationEmail">Email</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id="verificationPhone"
                  type="radio"
                  value="phoneNumber"
                  className="h-5 w-5"
                  {...register('verificationMethod', {
                    required: 'Select a verification method',
                  })}
                />
                <Label htmlFor="verificationPhone">Phone Number</Label>
              </div>
            </div>
            {errors.verificationMethod && (
              <p className="text-destructive text-sm">
                {errors.verificationMethod.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="cursor-pointer">
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Register;
