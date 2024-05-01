// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { userId, eventID } = req.body;

//     try {
//       // Code for creating an event registration...
//       return res.status(200).json({ message: 'Registered successfully' });
//     } catch (error) {
//       console.error('Registration error:', error);
//       return res.status(500).json({ message: 'Registration failed', error: error.message });
//     }
//   } else {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
// }










// import { PrismaClient } from '@prisma/client';

// export default async function handler(req, res) {
//   const prisma = new PrismaClient();

//   if (req.method === 'POST') {
//     // Extract userId and eventID from the request body
//     const { userId, eventID } = req.body;

//     // Make sure both IDs are provided
//     if (!userId || !eventID) {
//       return res.status(400).json({ error: 'Missing userId or eventID' });
//     }

//     try {
//       // Create the event registration
//       const eventRegistration = await prisma.eventRegistration.create({
//         data: {
//           userId: userId,
//           eventID: eventID,
//         },
//       });

//       return res.status(200).json(eventRegistration);
//     } catch (error) {
//       console.error('Error registering for event:', error);
//       return res.status(500).json({ error: error.message });
//     }
//   } else {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }
// }










import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === 'POST') {
    // Extract userId and eventID from the request body
    const { userId, eventID } = req.body;

    // Make sure both IDs are provided
    if (!userId || !eventID) {
      return res.status(400).json({ error: 'Missing userId or eventID' });
    }

    try {
      // Create the event registration with the relation to the User
      const eventRegistration = await prisma.eventRegistration.create({
        data: {
          // Connect the User to the EventRegistration
          user: {
            connect: { userId: userId },
          },
          // Connect the Event to the EventRegistration
          event: {
            connect: { eventID: eventID },
          },
        },
      });

      return res.status(200).json(eventRegistration);
    } catch (error) {
      console.error('Error registering for event:', error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
