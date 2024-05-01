// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// export async function POST(request) {
//   const body = await request.json();
//   const { username, password } = body;

//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         username,
//       },
//     });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       // Correct password
//       return NextResponse.json({
//         status: "success",
//         message: "Login successful",
//       });
//     } else {
//       // Wrong password or user does not exist
//       return NextResponse.json(
//         { status: "error", message: "Invalid credentials" },
//         { status: 401 }
//       );
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { status: "error", message: error.message },
//       { status: 500 }
//     );
//   }
// }











// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { username, password } = req.body;

//     try {
//       const user = await prisma.user.findUnique({
//         where: {
//           username,
//         },
//       });

//       if (user && await bcrypt.compare(password, user.password)) {
//         // Correct password
//         return res.status(200).json({ status: 'success', message: 'Login successful' });
//       } else {
//         // Wrong password or user does not exist
//         return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
//       }
//     } catch (error) {
//       return res.status(500).json({ status: 'error', message: error.message });
//     }
//   } else {
//     // If the request is not a POST, return 405 - Method Not Allowed
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }












import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (user && await bcrypt.compare(password, user.password)) {
        // Correct password
        // Include isAdmin in the response to indicate if they should be redirected to the admin page
        return res.status(200).json({ status: 'success', message: 'Login successful', isAdmin: user.isAdmin, userId: user.userId });
      } else {
        // Wrong password or user does not exist
        return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
      }
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  } else {
    // If the request is not a POST, return 405 - Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
