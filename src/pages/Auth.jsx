import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useContext, useEffect } from 'react';
import Register from './subComponents/Register';
import Login from './subComponents/Login';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  useEffect(() => {
    const storedAuthValue = localStorage.getItem('isAuthenticated');
    if (storedAuthValue === 'true') {
      setIsAuthenticated(true);
    }
    console.log(isAuthenticated);
  }, []);
  const navigateTo = useNavigate();
  //if a user is already authenticated then don't show this page

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo('/');
    }
  }, [isAuthenticated]);

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
          <Login />
        </TabsContent>
        {/* signup part */}
        <TabsContent value="signup">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
