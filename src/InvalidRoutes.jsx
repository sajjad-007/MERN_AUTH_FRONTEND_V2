import { House } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const InvalidRoutes = () => {
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="sm-w-[300px] w-[500px] flex flex-col gap-4 items-center justify-center">
        <h1 className=" text-9xl font-extrabold text-destructive">404</h1>
        <h2 className="text-2xl font-semibold">Invalid Routes</h2>
        <div></div>
        <Link
          className="text-2xl text-chart-2 flex items-center justify-center gap-2 hover:text-foreground"
          to="/auth"
        >
          Go Back to Homepage <House />
        </Link>
      </div>
    </div>
  );
};

export default InvalidRoutes;
