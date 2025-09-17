import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import Register from './subComponents/Register';
import Login from './subComponents/Login';

const Auth = () => {
  

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
