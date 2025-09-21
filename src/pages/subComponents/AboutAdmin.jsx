import React from 'react';
import adminImage from '../../assets/me.jpg';

// shadcn/ui components (assumes you have these available in your project)
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Github, Globe } from 'lucide-react';
// import { GitHub, Globe } from 'lucide-react';

export default function AboutAdminCard() {
  return (
    <Card className="max-w-3xl mx-auto shadow-lg">
      <CardHeader className="flex items-center gap-4 p-6 pb-2">
        <Avatar className="w-20 h-20">
          <AvatarImage src={adminImage} alt="Sajjad Hossain" />
          <AvatarFallback>SH</AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-start">
          <CardTitle className="text-lg">Sajjad Hossain (Author)</CardTitle>
          <CardDescription className="text-sm">
            MERN Stack Developer
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-4">
        <p className="text-[16px] leading-relaxed text-start">
          Hi, I’m Sajjad from Bangladesh. I work as a MERN Stack Developer with
          experience building full-stack web applications using MongoDB,
          Express, React, and Node.js. I enjoy designing RESTful APIs, creating
          responsive user interfaces, and implementing secure authentication and
          database solutions. My focus is on writing clean, maintainable code
          and delivering solutions that enhance the user experience. I like
          working on real-world projects, tackling technical challenges, and
          staying up to date with modern web technologies.
        </p>
      </CardContent>

      <CardFooter className="px-6 pb-6 flex gap-3">
        <a
          href="https://github.com/sajjad-007"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
        >
          <Button variant="outline" size="sm" asChild>
            <span className="inline-flex items-center gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </span>
          </Button>
        </a>

        <a
          href="https://sajjad-portfolioo.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
        >
          <Button variant="ghost" size="sm" asChild>
            <span className="inline-flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Portfolio
            </span>
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
