// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export default async function POST(req, res) {
//     const body = await request.json();
//     const { title, dateTime, description } = body;

//     // Log the dateTime received to check format
//     console.log("Received dateTime: ", dateTime);

//     try {
//         const event = await prisma.event.create({
//             data: {
//                 title,
//                 dateTime: new Date(dateTime), // Convert the dateTime to a Date object here
//                 description,
//             },
//         });

//         return NextResponse.json(event, { status: 201 });
//     } catch (error) {
//         // Handle errors such as unique constraint violations
//         console.error(error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

// pages/api/create-event/route.js

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // const { title, dateTime, description } = req.body;
    const { title, date, time, description } = req.body;

    try {
      const event = await prisma.event.create({
        data: {
          title,
          // dateTime: new Date(dateTime), // Convert the dateTime to a Date object here
          date,
          time,
          description,
        },
      });

      res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    // If the request is not a POST, return 405 - Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
