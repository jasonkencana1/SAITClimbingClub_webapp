// import { PrismaClient } from "@prisma/client";

// export default async function handler(req, res) {
//   const prisma = new PrismaClient();
//   const { reminderId } = req.query;
//   // console.log("API handler called with query:", req.query);


//   //   try {
//   //     // When using MongoDB with Prisma, use `String` type IDs directly without parsing
//   //     await prisma.reminder.delete({
//   //       where: { reminderId },
//   //     });
//   //     res.status(200).json({ message: "Reminder deleted successfully." });
//   //   } catch (error) {
//   //     console.error("Delete operation failed: ", error);
//   //     res.status(500).json({ error: "Unable to delete reminder." });
//   //   } finally {
//   //     await prisma.$disconnect();
//   //   }
//   // }






//   if (req.method === "DELETE") {
//     // console.log("Received reminderId for deletion:", reminderId);

//     try {
//       const deletedReminder = await prisma.reminder.delete({
//         where: { reminderId: reminderId },
//       });
//       console.log("Deleted reminder:", deletedReminder);
//       res.status(200).json({ message: "Reminder deleted successfully." });
//     } catch (error) {
//       console.error("Delete operation failed: ", error);
//       res
//         .status(500)
//         .json({ error: "Unable to delete reminder.", details: error.message });
//     } finally {
//       await prisma.$disconnect();
//     }
//   }
// }






// import { PrismaClient } from "@prisma/client";

// export default async function handler(req, res) {
//   const prisma = new PrismaClient();
//   const { reminderId } = req.query;

//   if (req.method === "DELETE") {
//   } else if (req.method === "PUT") {
//     try {
//       const { reminderTitle } = req.body;
//       const updatedReminder = await prisma.reminder.update({
//         where: { reminderId: reminderId },
//         data: { reminderTitle: reminderTitle },
//       });
//       res.status(200).json(updatedReminder);
//     } catch (error) {
//       console.error("Update operation failed: ", error);
//       res.status(500).json({ error: "Unable to update reminder.", details: error.message });
//     } finally {
//       await prisma.$disconnect();
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }






import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { reminderId } = req.query;

  if (req.method === "GET") {
    try {
      const reminder = await prisma.reminder.findUnique({
        where: { reminderId: reminderId },
      });
      if (reminder) {
        res.status(200).json(reminder);
      } else {
        res.status(404).json({ error: "Reminder not found." });
      }
    } catch (error) {
      console.error("Fetch operation failed: ", error);
      res.status(500).json({ error: "Unable to fetch reminder.", details: error.message });
    }
  } else if (req.method === "DELETE") {
    // DELETE method logic here
    // You need to fill in your delete logic or remove this block if it's not needed.
  } else if (req.method === "PUT") {
    try {
      const { reminderTitle } = req.body;
      const updatedReminder = await prisma.reminder.update({
        where: { reminderId: reminderId },
        data: { reminderTitle: reminderTitle },
      });
      res.status(200).json(updatedReminder);
    } catch (error) {
      console.error("Update operation failed: ", error);
      res.status(500).json({ error: "Unable to update reminder.", details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // It's good practice to disconnect when you're sure you're done with the database connection.
  // Especially in non-serverless environments or where connections are persistent.
  await prisma.$disconnect();
}
