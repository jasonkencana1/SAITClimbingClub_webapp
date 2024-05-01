import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    const userId = req.query.userId; // Or get from session/cookie if you have authentication set up
    console.log("Received userId for events query:", userId); // Add this line for debugging

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const registeredEvents = await prisma.eventRegistration.findMany({
        where: {
          userID: userId,
        },
        include: {
          event: true, // Include the event details
        },
      });

      console.log("Registered events for user:", registeredEvents); // Add this line for debugging

      // Map through the registrations to return only event data
      const events = registeredEvents.map((registration) => registration.event);

      return res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching registered events:', error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
