// // THIS WORKS
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   const { id } = req.query;

//   if (req.method === 'GET') {
//     try {
//       const user = await prisma.user.findUnique({
//         where: { userId: id },
//         select: {
//           userId: true,
//           username: true,
//           email: true,
//           isAdmin: true,
//           // Do not return the password
//         },
//       });

//       if (user) {
//         res.status(200).json(user);
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }










// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     // Existing code for GET request...
//   } else if (req.method === 'PUT') {
//     // Add this new block for handling PUT requests
//     const { id } = req.query; // Retrieve the user ID from the URL parameters
//     const { username, email, password } = req.body;

//     // Proceed to update the user
//     try {
//       // Hash the password if it's provided
//       const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

//       const updatedUser = await prisma.user.update({
//         where: { userId: id },
//         data: {
//           username,
//           email,
//           ...(hashedPassword && { password: hashedPassword }), // Only include password if it's provided
//         },
//       });

//       // Omit the password when returning the updated user data
//       const { password: _, ...userWithoutPassword } = updatedUser;
//       res.status(200).json(userWithoutPassword);
//     } catch (error) {
//       // If error.code is a Prisma error code indicating a unique constraint violation, you might want to handle it
//       // differently, for example, to inform the user that the email or username is already taken.
//       res.status(500).json({ message: 'Error updating user', error: error.message });
//     }
//   } else {
//     // Method not allowed
//     res.status(405).end(`Method ${req.method} not allowed`);
//   }
// }









// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   const { id } = req.query;

//   if (req.method === 'PUT') {
//     const { username, email, password } = req.body;

//     try {
//       const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

//       const data = {
//         ...(username && { username }),
//         ...(email && { email }),
//         ...(hashedPassword && { password: hashedPassword }),
//       };

//       const updatedUser = await prisma.user.update({
//         where: { userId: id },
//         data,
//       });

//       delete updatedUser.password; // remove password from the user object

//       return res.status(200).json(updatedUser);
//     } catch (error) {
//       console.error('Update error:', error);
//       return res.status(500).json({ message: 'Error updating user', error: error.message });
//     }
//   } else {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
// }










// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   const { id } = req.query;

//   if (req.method === 'GET') {
//     // Existing GET request handling
//     // ...
//   } else if (req.method === 'PUT') {
//     const { username, email, password } = req.body;
//     console.log('Received data for update:', req.body);

//     try {
//       const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

//       const data = {
//         ...(username && { username }),
//         ...(email && { email }),
//         ...(hashedPassword && { password: hashedPassword }),
//       };

//       const updatedUser = await prisma.user.update({
//         where: { userId: id },
//         data,
//       });

//       // Don't send back the password, even if hashed
//       delete updatedUser.password;

//       res.status(200).json({ message: 'User updated successfully', updateUser: updatedUser });
//     } catch (error) {
//       console.error('Error during update:', error);
//       res.status(500).json({ message: 'Error updating user', error: error.message });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }










import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userId: id },
      select: {
        userId: true,
        username: true,
        email: true,
        isAdmin: true,
        // Exclude the password and any other sensitive fields
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
