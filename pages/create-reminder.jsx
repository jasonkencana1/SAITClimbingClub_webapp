// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const CreateReminder = () => {
//   const [reminderTitle, setReminderTitle] = useState("");
//   const [eventId, setEventId] = useState("");
//   const [events, setEvents] = useState([]);

//   const router = useRouter();

//   useEffect(() => {
//     // Fetch events to display in the dropdown
//     const fetchEvents = async () => {
//       const response = await fetch("/api/get-event");
//       if (response.ok) {
//         const data = await response.json();
//         setEvents(data);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const handleLogout = () => {
//     // Clear the isAdmin flag from localStorage
//     localStorage.removeItem("isAdmin");

//     // Redirect to the Login page
//     router.push("/login");
//   };

//   const handleReminderCreation = async (event) => {
//     event.preventDefault();

//     // Retrieve admin status from localStorage for the request
//     const isAdmin = localStorage.getItem("isAdmin") === "true";

//     if (!reminderTitle || !eventId) return alert("Please fill in all fields.");

//     const response = await fetch("api/create-reminder/route", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ reminderTitle, eventId, isAdmin }),
//     });

//     if (response.ok) {
//       alert("Reminder created successfully!");
//       setReminderTitle("");
//       setEventId("");
//       router.push("/edit-reminders");
//     } else {
//       const error = await response.json();
//       alert(`Something went wrong: ${error.error}`);
//     }
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
//             className="pt-4 text-sm"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/admin");
//             }}
//           >
//             Admin
//           </a>
//           <a
//             href="/create-event"
//             className="pt-4 text-sm"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/create-event");
//             }}
//           >
//             Events
//           </a>
//           <a
//             href="/create-reminder"
//             className="pt-4 text-sm text-black"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/create-reminder");
//             }}
//           >
//             Reminders
//           </a>
//           <a
//             href="/profile"
//             className="pt-4 text-sm"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/profile");
//             }}
//           >
//             Profile
//           </a>
//           <button className="pt-4 text-sm" onClick={handleLogout}>
//             Logout
//           </button>
//         </h1>
//         <div className="flex flex-1 m-8">
//           <div className="m-auto w-11/12">
//             <div className="bg-gray-300 opacity-80 py-10 px-80">
//               <div className="mx-auto w-full max-w-lg">
//                 <div className="bg-gray-100 bg-opacity-80 px-20 p-2">
//                   <h2 className="text-center text-4xl p-1 font-bold leading-9 tracking-tight text-black">
//                     Reminder Creation
//                   </h2>
//                 </div>
//               </div>

//               <form
//                 className="bg-opacity-60 px-2"
//                 onSubmit={handleReminderCreation}
//               >
//                 <div className="text-center">
//                   <div>
//                     <div>
//                       <div className="flex flex-col">

//                         <div className="pt-16 text-start">
//                           <h2 className="text-2xl font-bold text-center pb-10">
//                             Create a Reminder for an Existing Event
//                           </h2>
//                           <label
//                             htmlFor="reminderTitle"
//                             className="font-semibold text-xl underline"
//                           >
//                             Reminder Title:
//                           </label>
//                           <input
//                             id="reminderTitle"
//                             name="reminderTitle"
//                             type="text"
//                             className="mt-4 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
//                             placeholder="Title.."
//                             required
//                             value={reminderTitle}
//                             onChange={(e) => setReminderTitle(e.target.value)}
//                           />
//                           <fieldset className="pt-2">
//                             <legend className="pt-10 text-xl font-semibold underline">
//                               Event Title:
//                             </legend>
//                             {events.map((event) => (
//                               <label key={event.eventID} className="text-lg block">
//                                 <input
//                                   type="radio"
//                                   name="event"
//                                   value={event.eventID}
//                                   checked={eventId === event.eventID}
//                                   onChange={(e) => setEventId(e.target.value)}
//                                   className="mr-2"
//                                 />
//                                 {event.title}
//                               </label>
//                             ))}
//                           </fieldset>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-center pt-20">
//                   <div>
//                     <button type="submit" className="pr-4">
//                       <h3 className="bg-green-500 text-white py-1 px-2 font-semibold hover:bg-green-600">
//                         CREATE
//                       </h3>
//                     </button>
//                   </div>
//                   <div>
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         router.push("/admin");
//                       }}
//                       className="px-4"
//                     >
//                       <h3 className="bg-red-500 text-white py-1 px-2 font-semibold hover:bg-red-600">
//                         CANCEL
//                       </h3>
//                     </button>
//                   </div>
//                   <div>
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         router.push("/edit-reminders");
//                       }}
//                       className="pl-4"
//                     >
//                       <h3 className="bg-gray-200 py-1 px-2 font-semibold hover:bg-gray-100">
//                         REMINDERS
//                       </h3>
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default CreateReminder;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import img5 from "@/app/assets/img5.jpg";
import img6 from "@/app/assets/img6.jpg";

const CreateReminder = () => {
  const [reminderTitle, setReminderTitle] = useState("");
  const [eventId, setEventId] = useState("");
  const [events, setEvents] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // Fetch events to display in the dropdown
    const fetchEvents = async () => {
      const response = await fetch("/api/get-event");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    };
    fetchEvents();
  }, []);

  const handleLogout = () => {
    // Clear the isAdmin flag from localStorage
    localStorage.removeItem("isAdmin");

    // Redirect to the Login page
    router.push("/login");
  };

  const handleReminderCreation = async (event) => {
    event.preventDefault();

    // Retrieve admin status from localStorage for the request
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!reminderTitle || !eventId) return alert("Please fill in all fields.");

    const response = await fetch("api/create-reminder/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reminderTitle, eventId, isAdmin }),
    });

    if (response.ok) {
      alert("Reminder created successfully!");
      setReminderTitle("");
      setEventId("");
      router.push("/admin");
    } else {
      const error = await response.json();
      alert(`Something went wrong: ${error.error}`);
    }
  };

  return (
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
    //             className="pt-4 text-sm"
    //             onClick={(e) => {
    //               e.preventDefault();
    //               router.push("/admin");
    //             }}
    //           >
    //             Admin
    //           </a>
    //           <a
    //             href="/create-event"
    //             className="pt-4 text-sm"
    //             onClick={(e) => {
    //               e.preventDefault();
    //               router.push("/create-event");
    //             }}
    //           >
    //             Events
    //           </a>
    //           <a
    //             href="/create-reminder"
    //             className="pt-4 text-sm text-black"
    //             onClick={(e) => {
    //               e.preventDefault();
    //               router.push("/create-reminder");
    //             }}
    //           >
    //             Reminders
    //           </a>
    //           <button className="pt-4 text-sm" onClick={handleLogout}>
    //             Logout
    //           </button>
    //         </h1>

    //         <div className="flex flex-1 m-8 bg-gray-300">
    //           <div className="m-auto w-11/12 relative">
    //             <div className="">
    //               <div className="flex mt-10">
    //                 <div className="w-1/2">
    //                   <Image
    //                     src={img5}
    //                     alt="photo"
    //                     className=""
    //                     style={{ maxWidth: "400px", maxHeight: "600px" }} // Adjust dimensions as needed
    //                   />
    //                 </div>
    //                 <div className="w-1/2">
    //                   <div className="w-1/2 relative">
    //                     <Image
    //                       src={img6}
    //                       alt="photo"
    //                       className=""
    //                       style={{ maxWidth: "400px", maxHeight: "600px" }} // Adjust dimensions as needed
    //                     />
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="absolute top-20 left-0 right-0 bg-gray-200 bg-opacity-80 p-4 text-white text-2xl font-bold">
    //               <div className="text-center">
    //                 <h2 className="text-center text-4xl p-1 font-bold leading-9 tracking-tight text-black">
    //                   Reminder Creation
    //                 </h2>
    //               </div>
    //             </div>

    //             <form
    //               className="bg-opacity-60 px-2"
    //               onSubmit={handleReminderCreation}
    //             >
    //               <div className="text-center">
    //                 <div>
    //                   <div>
    //                     <div className="flex flex-col">

    //                       <div className="pt-16 text-start">
    //                         <h2 className="text-2xl font-bold text-center pb-10">
    //                           Create Reminder For:
    //                         </h2>
    //                         <label
    //                           htmlFor="reminderTitle"
    //                           className="font-semibold text-xl"
    //                         >
    //                           Reminder Title:
    //                         </label>
    //                         <input
    //                           id="reminderTitle"
    //                           name="reminderTitle"
    //                           type="text"
    //                           className="mt-4 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
    //                           placeholder="Title.."
    //                           required
    //                           value={reminderTitle}
    //                           onChange={(e) => setReminderTitle(e.target.value)}
    //                         />
    //                         <fieldset className="pt-2">
    //                           <legend className="pt-10 text-xl font-semibold">
    //                             Event Title:
    //                           </legend>
    //                           {events.map((event) => (
    //                             <label
    //                               key={event.eventID}
    //                               className="text-lg block"
    //                             >
    //                               <input
    //                                 type="radio"
    //                                 name="event"
    //                                 value={event.eventID}
    //                                 checked={eventId === event.eventID}
    //                                 onChange={(e) => setEventId(e.target.value)}
    //                                 className="mr-2"
    //                               />
    //                               {event.title}
    //                             </label>
    //                           ))}
    //                         </fieldset>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="flex justify-center pt-10 pb-10">
    //                 <div>
    //                   <button type="submit" className="pr-4">
    //                     <h3 className="bg-green-500 text-white py-1 px-2 font-semibold hover:bg-green-600">
    //                       CREATE
    //                     </h3>
    //                   </button>
    //                 </div>
    //                 <div>
    //                   <button
    //                     onClick={(e) => {
    //                       e.preventDefault();
    //                       router.push("/admin");
    //                     }}
    //                     className="px-4"
    //                   >
    //                     <h3 className="bg-red-500 text-white py-1 px-2 font-semibold hover:bg-red-600">
    //                       CANCEL
    //                     </h3>
    //                   </button>
    //                 </div>
    //                 <div>
    //                   <button
    //                     onClick={(e) => {
    //                       e.preventDefault();
    //                       router.push("/edit-reminders");
    //                     }}
    //                     className="pl-4"
    //                   >
    //                     <h3 className="bg-gray-200 py-1 px-2 font-semibold hover:bg-gray-100">
    //                       REMINDERS
    //                     </h3>
    //                   </button>
    //                 </div>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </main>
    //   );
    // };

    // export default CreateReminder;

    <main className="min-h-screen flex flex-col">
      <div className="bg-gray-100 flex-grow">
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
            className="pt-4 text-sm"
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
            href="/create-reminder"
            className="pt-4 text-sm text-black"
            onClick={(e) => {
              e.preventDefault();
              router.push("/create-reminder");
            }}
          >
            Reminders
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
        <div className="flex flex-1 m-8 bg-gray-300">
          <div className="m-auto w-11/22 relative">
            <div className="">
              <div className="flex mt-10">
                <div className="w-1/2">
                  <Image
                    src={img5}
                    alt="photo"
                    className=""
                    style={{ maxWidth: "400px", maxHeight: "600px" }} // Adjust dimensions as needed
                  />
                </div>
                <div className="w-1/2">
                  <div className="w-1/2 relative">
                    <Image
                      src={img6}
                      alt="photo"
                      className=""
                      style={{ maxWidth: "400px", maxHeight: "600px" }} // Adjust dimensions as needed
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-1 m-6">
              <div className="m-auto w-11/12">
                <div className="">
                  <div className="absolute top-20 left-0 right-0 bg-gray-200 bg-opacity-80 p-4 text-white text-2xl font-bold">
                    <div className="text-center">
                      <h2 className="text-center text-4xl p-1 font-bold leading-9 tracking-tight text-black">
                        Reminder Creation
                      </h2>
                    </div>
                  </div>

                  <div className="bg-opacity-60 px-2">
                    <form onSubmit={handleReminderCreation}>
                      <div className="text-center">
                        <div>
                          <div>
                            <div className="flex flex-col">
                              <div className="pt-4 text-start">
                                <label
                                  htmlFor="title"
                                  className="font-semibold text-xl"
                                >
                                  Reminder Title:
                                </label>
                                <input
                                  id="reminderTitle"
                                  name="reminderTitle"
                                  type="text"
                                  className="mt-2 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
                                  placeholder="Title.."
                                  required
                                  value={reminderTitle}
                                  onChange={(e) =>
                                    setReminderTitle(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <fieldset className="pt-2">
                        <legend className="pt-10 text-xl font-semibold">
                          Event Title:
                        </legend>
                        {events.map((event) => (
                          <label key={event.eventID} className="text-lg block">
                            <input
                              type="radio"
                              name="event"
                              value={event.eventID}
                              checked={eventId === event.eventID}
                              onChange={(e) => setEventId(e.target.value)}
                              className="mr-2"
                            />
                            {event.title}
                          </label>
                        ))}
                      </fieldset>

                      <div className="flex justify-center pt-16">
                        <div>
                          <button type="submit" className="pr-4">
                            <h3 className="bg-green-500 text-white py-1 px-2 font-semibold hover:bg-green-600">
                              CREATE
                            </h3>
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/admin");
                            }}
                            className="px-4"
                          >
                            <h3 className="bg-red-500 text-white py-1 px-2 font-semibold hover:bg-red-600">
                              CANCEL
                            </h3>
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/edit-reminders");
                            }}
                            className="pl-4"
                          >
                            <h3 className="bg-gray-200 py-1 px-2 font-semibold hover:bg-gray-100">
                              REMINDERS
                            </h3>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateReminder;
