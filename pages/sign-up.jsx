// "use client";

// import React from "react";
// import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";

// const SignUpPage = ({ event }) => {
//   // Session will be undefined if no user is logged in
//   const { data: session } = useSession();
//   const router = useRouter();
//   console.log(session);

//   const signUpForEvent = async () => {
//     console.log("Button clicked.");
//     if (!session) {
//       console.log("You must be signed in to register for an event");
//       return;
//     }
//     // Retrieve the logged-in user's ID from the session
//     const userId = session.user.id;
//     const eventId = router.query.eventID;

//     const response = await fetch("/api/sign-up/route", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId, eventId }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log("Registered for event successfully");
//     } else {
//       const error = await response.json();
//       alert(`Something went wrong: ${error.message}`);
//       console.error("Failed to register for event");
//     }
//   };

//   const handleLogout = () => {
//     // Clear the isAdmin flag from localStorage
//     localStorage.removeItem("isAdmin");

//     // Redirect to the Login page
//     router.push("/login");
//   };

//   return (
//     <main className="min-h-screen flex flex-col">
//       <div className="bg-gray-100 flex-grow">
//         <h1 className="flex justify-between bg-orange-800 pt-4 pb-2 px-4 text-center text-2xl text-white font-bold">
//           <button
//             href="/dashboard"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/dashboard");
//             }}
//           >
//             SAIT Climbing Club
//           </button>
//           <a
//             href="/dashboard"
//             className="pt-4 text-sm"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/dashboard");
//             }}
//           >
//             Home
//           </a>
//           <a
//             href="/admin"
//             className="pt-4 text-sm text-black"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/admin");
//             }}
//           >
//             Admin
//           </a>
//           <a
//             href="/events"
//             className="pt-4 text-sm"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/events");
//             }}
//           >
//             Events
//           </a>
//           <button className="pt-4 text-sm" onClick={handleLogout}>
//             Logout
//           </button>
//         </h1>
//         <div className="flex flex-1 m-8">
//           <div className="m-auto w-11/12">
//             <div className="bg-gray-300 opacity-80 py-10 px-80">
//               <div className="mx-auto w-full max-w-2xl">
//                 <div className="bg-gray-100 bg-opacity-80 px-20 p-4">
//                   <h2 className="mt-2 text-center text-4xl p-1 font-bold leading-9 tracking-tight text-black">
//                     Event Registration
//                   </h2>
//                 </div>

//                 <div className="mt-20 text-center bg-gray-400 pt-4 py-6 border-2 border-orange-800">
//                   <div className="event-details">
//                     <h2 className="text-3xl font-bold">Event Details:</h2>
//                     <h2 className="text-2xl font-bold mt-6">
//                       Event Title: {event.title}
//                     </h2>
//                     <p className="text-lg mt-2">Event Date: {event.date}</p>
//                     <p className="text-lg">Event Time: {event.time}</p>
//                     <p className="text-lg font-light mt-10 pb-14">
//                       "{event.description}"
//                     </p>
//                   </div>
//                   <div>
//                     <div className="flex flex-row text-white font-semibold justify-center text-xl">
//                       <div className="pr-4">
//                         <div className="bg-green-500 hover:bg-green-600 py-1 px-2">
//                           <button onClick={signUpForEvent}>REGISTER</button>
//                         </div>
//                       </div>
//                       <div className="pl-4">
//                         <div className="bg-red-500 hover:bg-red-600 py-1 px-2">
//                           <button
//                             href="/events"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               router.push("/events");
//                             }}
//                           >
//                             CANCEL
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export async function getServerSideProps(context) {
//   const { query } = context;
//   const eventId = query.eventID;

//   const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
//   const host = process.env.VERCEL_URL || "localhost:3000";
//   const eventRes = await fetch(
//     `${protocol}://${host}/api/get-event/${eventId}`
//   );

//   if (!eventRes.ok) {
//     console.error(
//       `Failed to fetch event with ID ${eventId}: ${eventRes.status}`
//     );
//     return { props: { event: null, error: `Event not found` } };
//   }

//   const event = await eventRes.json();

//   return {
//     props: {
//       // Passing the event details as props to the page component
//       event,
//     },
//   };
// }

// export default SignUpPage;

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// const SignUp = () => {
//   const [userId, setUserId] = useState(null);
//   const [eventID, setEventID] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId');
//     const queryEventID = router.query.eventID;
//     if (storedUserId) {
//       setUserId(storedUserId);
//       setEventID(queryEventID);
//     } else {
//       router.push('/login');
//     }
//     setLoading(false);
//   }, [router]);

//   const handleRegistration = async () => {
//     if (!userId || !eventID) {
//       alert('User ID or Event ID missing');
//       return;
//     }
//     try {
//       const res = await fetch('/api/register-event', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId, eventID }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert('Registration successful');
//         router.push('/events');
//       } else {
//         throw new Error(data.message);
//       }
//     } catch (error) {
//       alert('Registration failed: ' + error.message);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Event Registration</h1>
//       <p>You are registering for event ID: {eventID}</p>
//       <button onClick={handleRegistration}>Register for Event</button>
//     </div>
//   );
// };

// export default SignUp;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import img5 from "@/assets/img5.jpg";
import img6 from "@/assets/img6.jpg";
import Image from "next/image";

const SignUp = () => {
  const [event, setEvent] = useState(null);
  const router = useRouter();

  // Extract the eventID from the query parameters
  const { eventID } = router.query;

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

  useEffect(() => {
    // Fetch the event details if eventID is available
    if (eventID) {
      fetch(`/api/events/${eventID}`)
        .then((res) => res.json())
        .then((data) => setEvent(data))
        .catch((error) => console.error("Error fetching event:", error));
    }
  }, [eventID]);

  const handleRegistration = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("You must be logged in to register for an event.");
      return;
    }

    try {
      const response = await fetch("/api/register-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, eventID }),
      });

      if (response.ok) {
        alert("Registration successful!");
        router.push("/events");
      } else {
        throw new Error("Failed to register for the event.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  if (!event) {
    return <div>Loading event details...</div>;
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="">
        <h1 className="flex justify-between bg-orange-800 pt-4 pb-2 px-4 text-center text-2xl text-white font-bold">
          <button
            href="/dashboard"
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard");
            }}
          >
            SAIT Climbing Club
          </button>
          <a
            href="/dashboard"
            className="pt-4 text-sm text-black"
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard");
            }}
          >
            Home
          </a>
          <a
            href="/admin"
            className="pt-4 text-sm"
            onClick={(e) => {
              e.preventDefault();
              router.push("/admin");
            }}
          >
            Admin
          </a>
          <a
            href="/events"
            className="pt-4 text-sm"
            onClick={(e) => {
              e.preventDefault();
              router.push("/events");
            }}
          >
            Events
          </a>
          <a
            href="/profile"
            className="pt-4 text-sm"
            onClick={(e) => {
              e.preventDefault();
              router.push("/profile");
            }}
          >
            Profile
          </a>
          <button className="pt-4 text-sm" onClick={handleLogout}>
            Logout
          </button>
        </h1>

        <div className="bg-gray-300 flex flex-col m-8">
          <div className="m-auto w-11/22 relative p-4">
            <div className="relative m-4">
              <div className="flex">
                <div className="w-1/2">
                  <Image
                    src={img5}
                    alt="photo"
                    // className=""
                    style={{ maxWidth: "400px", maxHeight: "1700px" }}
                  />
                </div>
                <div className="w-1/2">
                  <div className="w-1/2 relative">
                    <Image
                      src={img6}
                      alt="photo"
                      // className=""
                      style={{ maxWidth: "400px", maxHeight: "1700px" }}
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <h2
                      className="text-center text-3xl font-bold leading-9 tracking-tight text-black bg-gray-100 opacity-80 p-2 px-6"
                      style={{ zIndex: 10 }}
                    >
                      Event Registration
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 mb-8">
            <div className="m-auto w-11/12">
              <div className="">
                <div className="bg-gray-400 p-3 border-2 border-orange-800">
                  <div>
                    <div className="flex flex-col justify-center text-center mb-2">
                      <h1 className="text-3xl font-bold mb-4">
                        Event Details:
                      </h1>
                      <h2 className="text-xl font-bold">
                        Event Title: {event.title}
                      </h2>
                      <h2 className="text-xl">Event Date: {event.date}</h2>
                      <h2 className="text-xl">Event Time: {event.time}</h2>
                      <h3 className="text-xl mt-10">{event.description}</h3>
                      <div className="mt-10">
                        <button
                          className="text-white font-semibold pr-2"
                          onClick={handleRegistration}
                        >
                          <p className="text-xl bg-green-500 hover:bg-green-600 px-2 py-1">
                            SIGN UP
                          </p>
                        </button>
                        <button
                          className="text-xl text-white font-semibold pl-2"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push("/events");
                          }}
                        >
                          <p className="bg-red-500 hover:bg-red-600 px-2 py-1">
                            CANCEL
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
