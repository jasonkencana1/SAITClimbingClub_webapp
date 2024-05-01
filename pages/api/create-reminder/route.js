import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { reminderTitle, eventId, isAdmin } = req.body;

    // Check if the user is an admin
    if (!isAdmin) {
        return res.status(403).json({ error: "You must be an admin to create a reminder." });
      }

    try {
      const reminder = await prisma.reminder.create({
        data: {
          reminderTitle,
          eventId,
        },
      });

      res.status(201).json(reminder);
    } catch (error) {
      console.error('Error creating reminder:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    // If the request is not a POST, return 405 - Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
