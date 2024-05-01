import { PrismaClient } from '@prisma/client';
 
export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === 'GET') {
    try {
      const reminders = await prisma.reminder.findMany();
      res.status(200).json({ reminders });
    } catch (e) {
      res.status(500).json({ error: 'Unable to fetch reminders.' });
    } finally {
      await prisma.$disconnect();
    }
  }
}

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   console.log('API handler called', req.method, req.query);
//   if (req.method === 'GET') {
//     try {
//       // Check if an ID was provided in the query
//       const { id } = req.query;

//       if (id) {
//         // Fetch a single reminder by ID
//         console.log('Fetching reminder with ID:', id);
//         const reminder = await prisma.reminder.findUnique({
//           where: { reminderId: id },
//         });
//         console.log('Fetched reminder:', reminder);
//         if (reminder) {
//           res.status(200).json(reminder);
//         } else {
//           res.status(404).json({ error: 'Reminder not found.' });
//         }
//       } else {
//         // Fetch all reminders
//         const reminders = await prisma.reminder.findMany();
//         res.status(200).json({ reminders });
//       }
//     } catch (e) {
//       console.error('Error occurred while fetching data: ', e);
//       res.status(500).json({ error: 'Unable to fetch reminders.' });
//     } finally {
//       await prisma.$disconnect();
//     }
//   }
// }
