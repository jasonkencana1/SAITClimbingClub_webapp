// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();
// const saltRounds = 10;

// export async function POST(request) {
//   const body = await request.json();
//   const { username, email, password } = body;

//   // Check if the email domain is 'admin.com'
//   const isAdmin = email.endsWith("@admin.com");

//   // Hash the password before saving to the database
//   const hashedPassword = await bcrypt.hash(password, saltRounds);

//   try {
//     const user = await prisma.user.create({
//       data: {
//         username,
//         email,
//         password: hashedPassword,
//         isAdmin, // Set based on the email domain
//       },
//     });

//     return NextResponse.json(user, { status: 201 });
//   } catch (error) {
//     // Handle errors such as unique constraint violations
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }










// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();
// const saltRounds = 10;

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
    
//     const { username, email, password } = req.body;

//     // Check if the email domain is 'admin.com'
//     const isAdmin = email.endsWith('@admin.com');

//     // Hash the password before saving to the database
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     try {
//       const user = await prisma.user.create({
//         data: {
//           username,
//           email,
//           password: hashedPassword,
//           isAdmin, // Set based on the email domain
//         },
//       });

//       res.status(201).json(user);
//     } catch (error) {
//       // Handle errors such as unique constraint violations
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     // If the request is not a POST, return 405 - Method Not Allowed
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }










import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const { username, email, password } = req.body;

    // First, check if the username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    // If the user already exists, send an appropriate response
    if (existingUser) {
      res.status(409).json({ message: 'Username already exists' });
      return;
    }

    // Check if the email domain is 'admin.com'
    const isAdmin = email.endsWith('@admin.com');

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          isAdmin, // Set based on the email domain
        },
      });

      // Omit the password from the response for security reasons
      const { password, ...userDataWithoutPassword } = user;
      res.status(201).json(userDataWithoutPassword);
    } catch (error) {
      // If there's a unique constraint violation, handle here
      if (error.code === 'P2002') {
        res.status(409).json({ message: 'Email already exists' });
      } else {
        // Handle other types of errors
        res.status(500).json({ message: 'Error creating user', error: error.message });
      }
    }
  } else {
    // If the request is not a POST, return 405 - Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
