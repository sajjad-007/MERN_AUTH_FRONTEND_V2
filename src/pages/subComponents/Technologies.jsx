import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import express from '../../assets/Express.png';

const techData = [
  {
    name: 'React',
    image: 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
    description:
      'React is a powerful JavaScript library for building dynamic and responsive user interfaces.',
  },
  {
    name: 'Node.js',
    image: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg',
    description:
      'Node.js is a JavaScript runtime that lets you build scalable server-side applications.',
  },
  {
    name: 'Express.js',
    image: `${express}`,
    description:
      'Express.js is a lightweight web application framework for Node.js, used to build robust APIs.',
  },
  {
    name: 'MongoDB',
    image: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg',
    description:
      'MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.',
  },
];

const Technologies = () => {
  return (
    <section className="py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Technologies Used</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {techData.map((tech, index) => (
          <Card key={index} className="flex flex-col ">
            <CardHeader>
              <img
                src={tech.image}
                alt={tech.name}
                className="w-16 h-16 mx-auto"
              />
              <CardTitle className="mt-4 mb-2">{tech.name}</CardTitle>
              <CardDescription>{tech.description}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Technologies;
