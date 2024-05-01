// import { PrismaClient } from "@prisma/client";
 
// const prisma = new PrismaClient();
 
// export default async function handler(req, res) {
//     console.log(req.body)
//     console.log("Request Body:", req.body);
//   if (req.method === "POST") {
//     const { userId, eventId } = req.body;
 
//     try {
//       // Check if the user is already registered for the event
//       const existingRegistration = await prisma.eventRegistration.findFirst({
//         where: {
//           AND: [
//             {
//               userID: userId,
//             },
//             {
//               eventID: eventId,
//             },
//           ],
//         },
//       });
 
//       if (existingRegistration) {
//         return res
//           .status(409)
//           .json({ message: "User already registered for the event" });
//       }
 
//       // Create a new event registration
//       const registration = await prisma.eventRegistration.create({
//         data: {
//           userID: userId,
//           eventID: eventId,
//         },
//       });
 
//       return res.status(201).json(registration);
//     } catch (error) {
//       console.error("Error registering for event:", error);
//       return res.status(500).json({ error: "Error registering for event" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
