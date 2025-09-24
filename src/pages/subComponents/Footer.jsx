import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CircleUser, Github } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Footer = () => {
  return (
    <Card className=" border-none rounded-lg">
      <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 max-w-6xl mx-auto w-full">
        {/* Logo & Description */}
        <div>
          <CardTitle className="text-xl ">MERN Authentication</CardTitle>
          <p className="mt-2 text-sm">
            Complete MERN Authentication application
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold">Connect with me</h3>
          <div className="flex items-center justify-center gap-4 mt-3">
            <Tooltip>
              <TooltipTrigger>
                <Link to="https://github.com/sajjad-007" target="_blank">
                  <span className="text-lg  ">
                    <Github />
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-chart-4">Visit my Github</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  to="https://sajjad-portfolioo.netlify.app"
                  target="_blank"
                >
                  <span className="text-lg ">
                    <CircleUser />
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-chart-4">Visit my Portfolio</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardHeader>

      <CardContent />

      <CardFooter className="border-t border-gray-700 text-center flex flex-col gap-1 text-sm">
        <p>&copy; 2025 Sajjad-007. All Rights Reserved.</p>
        <p className="text-gray-400">Designed by Sajjad-007</p>
      </CardFooter>
    </Card>
  );
};

export default Footer;
