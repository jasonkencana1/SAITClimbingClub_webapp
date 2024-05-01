// import { PrismaClient } from "@prisma/client";

// export default async function handler(req, res) {
//   const prisma = new PrismaClient();
//   const { eventID } = req.query;

//   if (req.method === "DELETE") {
//   } else if (req.method === "PUT") {
//     try {
//       const { title, date, time, description } = req.body;
//       const updatedEvent = await prisma.event.update({
//         where: { eventID: eventID },
//         data: {
//           title: title,
//           date: date,
//           time: time,
//           description: description,
//         },
//       });
//       res.status(200).json(updatedEvent);
//     } catch (error) {
//       console.error("Update operation failed: ", error);
//       res
//         .status(500)
//         .json({ error: "Unable to update event.", details: error.message });
//     } finally {
//       await prisma.$disconnect();
//     }
//   } else {
//     res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }










// import { PrismaClient } from "@prisma/client";

// export default async function handler(req, res) {
//   const prisma = new PrismaClient();
//   const { eventID } = req.query;

//   if (req.method === "DELETE") {
//     try {
//       const deletedEvent = await prisma.event.delete({
//         where: { eventID: eventID },
//       });
//       res.status(200).json(deletedEvent);
//     } catch (error) {
//       console.error("Delete operation failed: ", error);
//       res
//         .status(500)
//         .json({ error: "Unable to delete event.", details: error.message });
//     } finally {
//       await prisma.$disconnect();
//     }
//   } else if (req.method === "PUT") {
//     try {
//       const { title, date, time, description } = req.body;
//       const updatedEvent = await prisma.event.update({
//         where: { eventID: eventID },
//         data: {
//           title: title,
//           date: date,
//           time: time,
//           description: description,
//         },
//       });
//       res.status(200).json(updatedEvent);
//     } catch (error) {
//       console.error("Update operation failed: ", error);
//       res
//         .status(500)
//         .json({ error: "Unable to update event.", details: error.message });
//     } finally {
//       await prisma.$disconnect();
//     }
//   } else {
//     res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }










import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { eventID } = req.query;

  if (req.method === "GET") {
    try {
      const event = await prisma.event.findUnique({
        where: { eventID: eventID },
      });
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ error: "Event not found." });
      }
    } catch (error) {
      console.error("Fetch operation failed: ", error);
      res.status(500).json({ error: "Unable to fetch event.", details: error.message });
    }
  // } else if (req.method === "DELETE") {
  //   try {
  //     const deletedEvent = await prisma.event.delete({
  //       where: { eventID: eventID },
  //     });
  //     res.status(200).json(deletedEvent);
  //   } catch (error) {
  //     console.error("Delete operation failed: ", error);
  //     res.status(500).json({ error: "Unable to delete event.", details: error.message });
  //   }
} else if (req.method === "DELETE") {
  try {
    // Delete reminders associated with the event first
    await prisma.reminder.deleteMany({
      where: { eventId: eventID },
      // where: { eventID },
    });

    // Then delete the event
    const deletedEvent = await prisma.event.delete({
      // where: { eventID: parseInt(eventID) },
      where: { eventID: eventID },
    });
    res.status(200).json(deletedEvent);
  } catch (error) {
    console.error("Delete operation failed: ", error);
    res.status(500).json({ error: "Unable to delete event.", details: error.message });
  }
  } else if (req.method === "PUT") {
    try {
      const { title, date, time, description } = req.body;
      const updatedEvent = await prisma.event.update({
        where: { eventID: eventID },
        data: {
          title: title,
          date: date,
          time: time,
          description: description,
        },
      });
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error("Update operation failed: ", error);
      res.status(500).json({ error: "Unable to update event.", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await prisma.$disconnect();
}
