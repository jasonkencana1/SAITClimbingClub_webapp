// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method === 'PUT') {
//     const { userId, username, email, password } = req.body;

//     // Log the received data to debug
//     console.log('Received data for update:', req.body);

//     // Ensure that the userId is passed as a string and it's a valid ObjectId
//     if (typeof userId !== 'string' || !userId.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ message: 'Invalid userId' });
//     }
    
//     // Hash new password if it's being changed
//     const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

//     // try {
//     //   const updateUser = await prisma.user.update({
//     //     where: { userId },
//     //     data: {
//     //       username,
//     //       email,
//     //       ...(hashedPassword && { password: hashedPassword }),
//     //     },
//     //   });

//     try {
//       const updateUser = await prisma.user.update({
//         where: { userId },
//         data: {
//           ...(username && { username }),
//           ...(email && { email }),
//           ...(hashedPassword && { password: hashedPassword }),
//         },
//       });

//       // Don't send back the password, even if hashed
//       delete updateUser.password;

//       res.status(200).json({ message: 'User updated successfully', updateUser });
//     } catch (error) {
//       console.error('Error during update:', error);
//       // res.status(500).json({ message: 'Error updating user', error: error.message });
//     }
//   } else {
//     res.status(405).end(`Method ${req.method} not allowed`);
//   }
// }










import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).end(`Method ${req.method} not allowed`);
  }

  const { userId, username, email, password } = req.body;

  // Ensure that the userId is passed as a string and it's a valid ObjectId
  if (!userId || typeof userId !== 'string' || !userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  try {
    const updateData = {
      ...(username && { username }),
      ...(email && { email }),
    };

    // Only update the password if it's provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { userId },
      data: updateData,
    });

    // Exclude the password from the response
    delete updatedUser.password;

    return res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    console.error('Error during update:', error);
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
}
