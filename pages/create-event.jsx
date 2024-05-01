// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";

// const CreateEvent = () => {
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [description, setDescription] = useState("");

//   const router = useRouter();

//   const handleLogout = () => {
//     // Clear the isAdmin flag from localStorage
//     localStorage.removeItem("isAdmin");

//     // Redirect to the Login page
//     router.push("/login");
//   };

//   const handleEventCreation = async (event) => {
//     event.preventDefault();

//     if (!title || !date || !time) return alert("Please fill in all fields.");

//     const response = await fetch("api/create-event/route", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ title, date, time, description }),
//     });

//     const responseData = await response.json();
//     if (response.ok) {
//       alert("Event has been created successfully!");
//       setTitle("");
//       setDate("");
//       setTime("");
//       setDescription("");
//       router.push("/events");
//     } else {
//       console.error("Server Response", responseData);
//       alert(`Something went wrong: ${responseData.error}`);
//     }
//   };

//   return (
//     <main className="min-h-screen flex flex-col">
//       <div className="bg-gray-100 flex-grow">
//         <h1 className="flex justify-between bg-orange-800 pt-4 pb-2 px-4 text-center text-2xl text-white font-bold">
//         <button
//           href="/dashboard"
//           onClick={(e) => {
//             e.preventDefault();
//             router.push("/dashboard");
//           }}>
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
//             href="/events"
//             className="pt-4 text-sm text-black"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/events");
//             }}
//           >
//             Events
//           </a>
//           <a
//             href="/create-reminder"
//             className="pt-4 text-sm"
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
//         <div className="flex flex-1 m-6">
//           <div className="m-auto w-11/12">
//             <div className="bg-gray-300 opacity-80 py-10 px-80">
//               <div className="mx-auto w-full max-w-lg">
//                 <div className="bg-gray-100 bg-opacity-60 px-20 p-2">
//                   <h2 className="text-center text-4xl p-1 font-bold leading-9 tracking-tight text-black">
//                     Event Creation
//                   </h2>
//                 </div>
//               </div>

//               <form
//                 className="bg-opacity-60 px-2"
//                 onSubmit={handleEventCreation}
//               >
//                 <div className="text-center">
//                   <div className="">
//                     <div>
//                       <div className="flex flex-col">
//                         <div className="pt-12 text-start">
//                           <label
//                             htmlFor="title"
//                             className="font-semibold text-xl underline"
//                           >
//                             Event Title:
//                           </label>
//                           <input
//                             id="title"
//                             name="title"
//                             type="text"
//                             className="mt-2 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
//                             placeholder="Title.."
//                             required
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className="pt-10 text-start">
//                         <label
//                           htmlFor="date"
//                           className="font-semibold text-xl underline"
//                         >
//                           Event Date:
//                         </label>
//                         <input
//                           id="date"
//                           name="date"
//                           type="text"
//                           className="mt-2 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
//                           placeholder="Date.."
//                           required
//                           value={date}
//                           onChange={(e) => setDate(e.target.value)}
//                         />
//                       </div>
//                       <div className="pt-10 text-start">
//                         <label
//                           htmlFor="dateTime"
//                           className="font-semibold text-xl underline"
//                         >
//                           Event Time:
//                         </label>
//                         <input
//                           id="time"
//                           name="time"
//                           type="text"
//                           className="mt-2 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
//                           placeholder="Time.."
//                           required
//                           value={time}
//                           onChange={(e) => setTime(e.target.value)}
//                         />
//                       </div>
//                       <div className="pt-10 text-start">
//                         <label
//                           htmlFor="description"
//                           className="font-semibold text-xl underline"
//                         >
//                           Event Description:
//                         </label>
//                         <textarea
//                           id="description"
//                           name="description"
//                           className="mt-2 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
//                           placeholder="Description.."
//                           rows="2"
//                           required
//                           value={description}
//                           onChange={(e) => setDescription(e.target.value)}
//                         ></textarea>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-center pt-10">
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
//                         router.push("/edit-events");
//                       }}
//                       className="pl-4"
//                     >
//                       <h3 className="bg-gray-200 py-1 px-2 font-semibold hover:bg-gray-100">
//                         EVENTS
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

// export default CreateEvent;

// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// import product1 from "@/app/assets/img/product1.jpg";

// const CreateEvent = () => {
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [description, setDescription] = useState("");

//   const router = useRouter();

//   const handleLogout = () => {
//     // Clear the isAdmin flag from localStorage
//     localStorage.removeItem("isAdmin");

//     // Redirect to the Home or Login page
//     router.push("/login");
//   };

//   const handleEventCreation = async (event) => {
//     event.preventDefault();

//     if (!title || !date || !time) return alert("Please fill in all fields.");

//     const response = await fetch("api/create-event/route", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ title, date, time, description }),
//     });

//     const responseData = await response.json();
//     if (response.ok) {
//       alert("Event has been created successfully!");
//       setTitle("");
//       setDate("");
//       setTime("");
//       setDescription("");
//       router.push("/edit-events");
//     } else {
//       console.error("Server Response", responseData);
//       alert(`Something went wrong: ${responseData.error}`);
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
//             href="/events"
//             className="pt-4 text-sm text-black"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/events");
//             }}
//           >
//             Events
//           </a>
//           <a
//             href="/create-reminder"
//             className="pt-4 text-sm"
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
//         <div className="bg-gray-300 flex flex-col m-8">
//           <div className="m-auto w-11/22 relative p-4">
//             <div className="relative m-4">
//               <div className="flex">
//                 <div className="w-1/2">
//                   <Image
//                     src={product1}
//                     alt="photo"
//                     style={{ maxWidth: "400px", maxHeight: "1700px" }}
//                   />
//                 </div>
//                 <div className="w-1/2">
//                   <div className="w-1/2 relative">
//                     <Image
//                       src={product1}
//                       alt="photo"
//                       style={{ maxWidth: "400px", maxHeight: "1600px" }}
//                     />
//                   </div>
//                   <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
//                     <h2
//                       className="text-center text-3xl font-bold leading-9 tracking-tight text-black bg-gray-100 opacity-80 p-2 px-6"
//                       style={{ zIndex: 10 }}
//                     >
//                       Event Creation
//                     </h2>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-1 m-6 justify-center">
//             <div className="w-full max-w-4xl">
//               <div className="">
//                 <form
//                   className="bg-opacity-60 px-2"
//                   onSubmit={handleEventCreation}
//                 >
//                   <div className="text-center">
//                     <div className="">
//                       <div>
//                         <div className="flex flex-col">
//                           <div className="text-start">
//                             <label
//                               htmlFor="title"
//                               className="font-semibold text-xl"
//                             >
//                               Event Title:
//                             </label>
//                             <input
//                               id="title"
//                               name="title"
//                               type="text"
//                               className="mt-2 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
//                               placeholder="Title.."
//                               required
//                               value={title}
//                               onChange={(e) => setTitle(e.target.value)}
//                             />
//                           </div>
//                         </div>
//                         <div className="pt-10 text-start">
//                           <label
//                             htmlFor="date"
//                             className="font-semibold text-xl"
//                           >
//                             Event Date:
//                           </label>
//                           <input
//                             id="date"
//                             name="date"
//                             type="text"
//                             className="mt-2 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
//                             placeholder="Date.."
//                             required
//                             value={date}
//                             onChange={(e) => setDate(e.target.value)}
//                           />
//                         </div>
//                         <div className="pt-10 text-start">
//                           <label
//                             htmlFor="dateTime"
//                             className="font-semibold text-xl"
//                           >
//                             Event Time:
//                           </label>
//                           <input
//                             id="time"
//                             name="time"
//                             type="text"
//                             className="mt-2 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
//                             placeholder="Time.."
//                             required
//                             value={time}
//                             onChange={(e) => setTime(e.target.value)}
//                           />
//                         </div>
//                         <div className="pt-10 text-start">
//                           <label
//                             htmlFor="description"
//                             className="font-semibold text-xl"
//                           >
//                             Event Description:
//                           </label>
//                           <textarea
//                             id="description"
//                             name="description"
//                             className="mt-2 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
//                             placeholder="Description.."
//                             rows="2"
//                             required
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                           ></textarea>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex justify-center pt-10">
//                     <div>
//                       <button type="submit" className="pr-4">
//                         <h3 className="bg-green-500 text-white py-1 px-2 font-semibold hover:bg-green-600">
//                           CREATE
//                         </h3>
//                       </button>
//                     </div>
//                     <div>
//                       <button
//                         onClick={(e) => {
//                           e.preventDefault();
//                           router.push("/admin");
//                         }}
//                         className="px-4"
//                       >
//                         <h3 className="bg-red-500 text-white py-1 px-2 font-semibold hover:bg-red-600">
//                           CANCEL
//                         </h3>
//                       </button>
//                     </div>
//                     <div>
//                       <button
//                         onClick={(e) => {
//                           e.preventDefault();
//                           router.push("/edit-events");
//                         }}
//                         className="pl-4"
//                       >
//                         <h3 className="bg-gray-200 py-1 px-2 font-semibold hover:bg-gray-100">
//                           EVENTS
//                         </h3>
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default CreateEvent;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import img1 from "@/assets/img1.jpg";
import img2 from "@/assets/img2.jpg";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleLogout = () => {
    // Clear the isAdmin flag from localStorage
    localStorage.removeItem("isAdmin");

    // Redirect to the Home or Login page
    router.push("/login");
  };

  const handleEventCreation = async (event) => {
    event.preventDefault();

    if (!title || !date || !time) return alert("Please fill in all fields.");

    const response = await fetch("api/create-event/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, date, time, description }),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Event has been created successfully!");
      setTitle("");
      setDate("");
      setTime("");
      setDescription("");
      router.push("/admin");
    } else {
      console.error("Server Response", responseData);
      alert(`Something went wrong: ${responseData.error}`);
    }
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
            href="/events"
            className="pt-4 text-sm text-black"
            onClick={(e) => {
              e.preventDefault();
              router.push("/events");
            }}
          >
            Events
          </a>
          <a
            href="/create-reminder"
            className="pt-4 text-sm"
            onClick={(e) => {
              e.preventDefault();
              router.push("/create-reminder");
            }}
          >
            Reminders
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
                    src={img1}
                    alt="photo"
                    className=""
                    style={{ maxWidth: "400px", maxHeight: "600px" }} // Adjust dimensions as needed
                  />
                </div>
                <div className="w-1/2">
                  <div className="w-1/2 relative">
                    <Image
                      src={img2}
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
                        Event Creation
                      </h2>
                    </div>
                  </div>

                  <form
                    className="bg-opacity-60 px-2"
                    onSubmit={handleEventCreation}
                  >
                    <div className="text-center">
                      <div>
                        <div>
                          <div className="flex flex-col">
                            
                            <div className="pt-4 text-start">
                              <label
                                htmlFor="title"
                                className="font-semibold text-xl"
                              >
                                Event Title:
                              </label>
                              <input
                                id="title"
                                name="title"
                                type="text"
                                className="mt-2 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
                                placeholder="Title.."
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="pt-10 text-start">
                            <label
                              htmlFor="date"
                              className="font-semibold text-xl"
                            >
                              Event Date:
                            </label>
                            <input
                              id="date"
                              name="date"
                              type="text"
                              className="mt-2 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
                              placeholder="Date.."
                              required
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                            />
                          </div>
                          <div className="pt-10 text-start">
                            <label
                              htmlFor="dateTime"
                              className="font-semibold text-xl"
                            >
                              Event Time:
                            </label>
                            <input
                              id="time"
                              name="time"
                              type="text"
                              className="mt-2 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
                              placeholder="Time.."
                              required
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                            />
                          </div>
                          <div className="pt-10 text-start">
                            <label
                              htmlFor="description"
                              className="font-semibold text-xl"
                            >
                              Event Description:
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              className="mt-2 text-md text-gray-900 bg-gray-50 px-2 py-1 w-full"
                              placeholder="Description.."
                              rows="2"
                              required
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center pt-10">
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
                            router.push("/edit-events");
                          }}
                          className="pl-4"
                        >
                          <h3 className="bg-gray-200 py-1 px-2 font-semibold hover:bg-gray-100">
                            EVENTS
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
    </main>
  );
};

export default CreateEvent;
