import { PrismaClient } from '@prisma/client';
 
export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === 'GET') {
    try {
      const events = await prisma.event.findMany();
      res.status(200).json({ events });
    } catch (e) {
      res.status(500).json({ error: 'Unable to fetch events.' });
    } finally {
      await prisma.$disconnect();
    }
  }
}