// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";

// const EditEventPage = () => {
//   const [eventData, setEventData] = useState({
//     // text: "",
//     title: "",
//     date: "",
//     time: "",
//     description: "",
//   });
//   const router = useRouter();
//   const { id } = router.query;

//   // useEffect(() => {
//   //   // Fetch the specific event details from your API
//   //   const fetchEventDetails = async () => {
//   //     const response = await fetch(`/api/events/${id}`);
//   //     const data = await response.json();
//   //     setEventData(data);
//   //   };

//   //   if (id) {
//   //     fetchEventDetails();
//   //   }
//   // }, [id]);

//   useEffect(() => {
//     const fetchEventDetails = async () => {
//       const response = await fetch(`/api/events/${id}`);
//       const data = await response.json();
//       // Assuming the data is returned at the top level and includes _id:
//       const { _id, ...eventDetails } = data;
//       console.log(eventData, eventDetails);
//       setEventData(eventDetails);
//     };

//     if (id) {
//       fetchEventDetails();
//     }
//   }, [id]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     console.log("Updating event with data:", eventData);

//     try {
//       const response = await fetch(`/api/events/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: eventData.title,
//           date: eventData.date,
//           time: eventData.time,
//           description: eventData.description,
//         }),
//       });

//       if (response.ok) {
//         // If the update is successful, fetch the updated events list or redirect
//         console.log("Event updated successfully");
//         router.push("/edit-events"); // Make sure this is the correct route
//       } else {
//         // Handle errors if the response is not okay
//         const errorData = await response.json();
//         console.error("Failed to update event:", errorData);
//       }
//     } catch (error) {
//       // Catch and log any errors during the fetch request
//       console.error("Error submitting form:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventData({ ...eventData, [name]: value });
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
//             className="pt-4 text-sm"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/admin");
//             }}
//           >
//             Admin
//           </a>
//           <a
//             href="/edit-events"
//             className="pt-4 text-sm text-black"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/edit-events");
//             }}
//           >
//             Events
//           </a>
//           <a
//             href="/create-event"
//             className="pt-4 text-sm"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/edit-reminders");
//             }}
//           >
//             Reminders
//           </a>
//           <button className="pt-4 text-sm" onClick={handleLogout}>
//             Logout
//           </button>
//         </h1>
//         <div className="flex flex-1 m-6">
//           <div className="m-auto w-11/12">
//             <div className="bg-gray-300 opacity-80 py-10 px-80">
//               <div className="mx-auto w-full max-w-lg">
//                 <div className="bg-gray-100 bg-opacity-60 px-20 p-2">
//                   <h2 className="text-center text-4xl p-1 font-bold leading-9 tracking-tight text-black">
//                     Edit Events
//                   </h2>
//                 </div>
//               </div>
//               <div className="flex justify-center">
//                 <div className="my-2">
//                   <div className="mt-6">
//                     <div className="bg-gray-200 p-4">
//                       <form onSubmit={handleSubmit}>
//                         {/* <h2 className="flex items-center justify-center mt-2 mb-6 text-lg font-semibold">
//                         Edit Event
//                       </h2> */}
//                         <div className="flex flex-col items-center">
//                           <div className="mt-4 pr-4">
//                             <label
//                               htmlFor="text"
//                               className="text-xl font-semibold pr-7 pl-4"
//                             >
//                               Event Title:{" "}
//                             </label>
//                             <input
//                               id="title"
//                               name="title"
//                               type="text"
//                               value={eventData.title}
//                               onChange={handleChange}
//                               placeholder={eventData.title || "Title.."}
//                               className="text-lg pl-1"
//                               required
//                             />
//                           </div>
//                           <div className="mt-4 pr-4">
//                             <label
//                               htmlFor="text"
//                               className="text-xl font-semibold pr-7 pl-4"
//                             >
//                               Event Date:{" "}
//                             </label>
//                             <input
//                               id="date"
//                               name="date"
//                               type="text"
//                               value={eventData.date}
//                               onChange={handleChange}
//                               placeholder={eventData.date || "Date.."}
//                               className="text-lg pl-1"
//                               required
//                             />
//                           </div>
//                           <div className="mt-4 pr-4">
//                             <label
//                               htmlFor="text"
//                               className="text-xl font-semibold pr-7 pl-4"
//                             >
//                               Event Time:{" "}
//                             </label>
//                             <input
//                               id="time"
//                               name="time"
//                               type="text"
//                               value={eventData.time}
//                               onChange={handleChange}
//                               placeholder={eventData.time || "Time.."}
//                               className="text-lg pl-1"
//                               required
//                             />
//                           </div>
//                           <div className="mt-8 pr-4 flex">
//                             <label
//                               htmlFor="text"
//                               className="text-xl font-semibold pr-6 pl-4"
//                             >
//                               Description:{" "}
//                             </label>
//                             {/* <input
//                               id="description"
//                               name="description"
//                               type="text"
//                               value={eventData.description}
//                               onChange={handleChange}
//                               placeholder={eventData.description || " Description.."}
//                               className="text-lg"
//                               required
//                             /> */}
//                           </div>
//                           <div className="mt-4">
//                             <textarea
//                               id="description"
//                               name="description"
//                               value={eventData.description}
//                               onChange={handleChange}
//                               placeholder="Description.."
//                               className="text-lg w-full p-2"
//                               rows="4"
//                               required
//                             ></textarea>
//                           </div>
//                         </div>
//                         <div className="mt-10 pl-12 mb-4">
//                           <button
//                             type="submit"
//                             className="bg-green-500 py-1 px-2 font-semibold ml-20 hover:bg-green-600 text-white"
//                           >
//                             UPDATE EVENT
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                   <div className="flex justify-center mt-10">
//                     <button
//                       className="bg-red-500 py-1 px-2 text-white text-md font-semibold hover:bg-red-600"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         router.push("/edit-events");
//                       }}
//                     >
//                       CANCEL
//                     </button>
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

// export default EditEventPage;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import img1 from "@/app/assets/img1.jpg";
import img2 from "@/app/assets/img2.jpg";

const EditEventPage = () => {
  const [eventData, setEventData] = useState({
    // text: "",
    title: "",
    date: "",
    time: "",
    description: "",
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchEventDetails = async () => {
      const response = await fetch(`/api/events/${id}`);
      const data = await response.json();
      // Assuming the data is returned at the top level and includes _id:
      const { _id, ...eventDetails } = data;
      console.log(eventData, eventDetails);
      setEventData(eventDetails);
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Updating event with data:", eventData);

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: eventData.title,
          date: eventData.date,
          time: eventData.time,
          description: eventData.description,
        }),
      });

      if (response.ok) {
        // If the update is successful, fetch the updated events list or redirect
        console.log("Event updated successfully");
        router.push("/edit-events"); // Make sure this is the correct route
      } else {
        // Handle errors if the response is not okay
        const errorData = await response.json();
        console.error("Failed to update event:", errorData);
      }
    } catch (error) {
      // Catch and log any errors during the fetch request
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleLogout = () => {
    // Clear the isAdmin flag from localStorage
    localStorage.removeItem("isAdmin");

    // Redirect to the Login page
    router.push("/login");
  };

  return (
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
            href="/edit-events"
            className="pt-4 text-sm text-black"
            onClick={(e) => {
              e.preventDefault();
              router.push("/edit-events");
            }}
          >
            Events
          </a>
          <a
            href="/create-event"
            className="pt-4 text-sm"
            onClick={(e) => {
              e.preventDefault();
              router.push("/edit-reminders");
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
        
        <div className="bg-gray-300 flex flex-1 m-8">
          <div className="m-auto w-11/22 relative">
            <div className="relative m-8">
              <div className="flex">
                <div className="w-1/2">
                  <Image
                    src={img2}
                    alt="photo"
                    style={{ maxWidth: "400px", maxHeight: "1700px" }}
                  />
                </div>
                <div className="w-1/2">
                  <div className="w-1/2 relative">
                    <Image
                      src={img1}
                      alt="photo"
                      style={{ maxWidth: "400px", maxHeight: "1700px" }}
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <h2
                      className="text-center text-3xl font-bold leading-9 tracking-tight text-black bg-gray-100 opacity-80 p-2 px-6"
                      style={{ zIndex: 10 }}
                    >
                      Edit Events
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex justify-center"> */}
            <div className="flex flex-1 items-center justify-center m-8 p-4 bg-gray-200 border rounded-lg">
              <div className="w-full">
                <div className="">
                  <div className="p-4">
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col items-center">
                        <div className="pr-4">
                          <label
                            htmlFor="text"
                            className="text-xl font-semibold pr-7 pl-4"
                          >
                            Event Title:{" "}
                          </label>
                          <input
                            id="title"
                            name="title"
                            type="text"
                            value={eventData.title}
                            onChange={handleChange}
                            placeholder={eventData.title || " Title.."}
                            className="text-lg pl-1"
                            required
                          />
                        </div>
                        <div className="mt-4 pr-4">
                          <label
                            htmlFor="text"
                            className="text-xl font-semibold pr-7 pl-4"
                          >
                            Event Date:{" "}
                          </label>
                          <input
                            id="date"
                            name="date"
                            type="text"
                            value={eventData.date}
                            onChange={handleChange}
                            placeholder={eventData.date || " Date.."}
                            className="text-lg pl-1"
                            required
                          />
                        </div>
                        <div className="mt-4 pr-4">
                          <label
                            htmlFor="text"
                            className="text-xl font-semibold pr-7 pl-4"
                          >
                            Event Time:{" "}
                          </label>
                          <input
                            id="time"
                            name="time"
                            type="text"
                            value={eventData.time}
                            onChange={handleChange}
                            placeholder={eventData.time || " Time.."}
                            className="text-lg pl-1"
                            required
                          />
                        </div>
                        <div className="mt-8 pr-4 flex">
                          <label
                            htmlFor="text"
                            className="text-xl font-semibold pr-6 pl-4"
                          >
                            Description:{" "}
                          </label>
                        </div>
                        <div className="mt-4 w-3/4">
                          <textarea
                            id="description"
                            name="description"
                            value={eventData.description}
                            onChange={handleChange}
                            placeholder="Description.."
                            className="text-lg w-full p-2"
                            rows="4"
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="mt-6 pr-20 flex justify-between">
                        <button
                          type="submit"
                          className="bg-green-500 py-1 px-2 font-semibold ml-20 hover:bg-green-600 text-white"
                        >
                          UPDATE EVENT
                        </button>
                        <button
                          className="bg-red-500 py-1 px-2 text-white text-md font-semibold hover:bg-red-600"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push("/edit-events");
                          }}
                        >
                          CANCEL
                        </button>
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

export default EditEventPage;
