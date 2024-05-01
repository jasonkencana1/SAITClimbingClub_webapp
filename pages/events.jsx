"use client";

import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import img4 from "@/assets/img4.jpg";
import img1 from "@/assets/img1.jpg";

function EventsPage({ events }) {
  const router = useRouter();

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
                    src={img4}
                    alt="photo"
                    // className=""
                    style={{ maxWidth: "400px", maxHeight: "300px" }}
                  />
                </div>
                <div className="w-1/2">
                  <div className="w-1/2 relative">
                    <Image
                      src={img1}
                      alt="photo"
                      // className=""
                      style={{ maxWidth: "400px", maxHeight: "246px" }}
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <h2
                      className="text-center text-3xl font-bold leading-9 tracking-tight text-black bg-gray-100 opacity-80 p-2 px-6"
                      style={{ zIndex: 10 }}
                    >
                      Upcoming Events
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div className="flex flex-1 mb-8">
          <div className="m-auto w-1/2">
              <div className="">
                <div className="bg-gray-200 p-3 rounded-xl">
                  <div>
                    {events.map((event) => (
                      <div
                        key={event.eventID}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <div>
                          <h2 className="text-2xl font-bold">{event.title}</h2>
                          <p className="text-lg">
                            {event.date} at {event.time}
                          </p>
                          <p>"{event.description}"</p>
                        </div>

                        <button
                          className="bg-gray-300 px-2 py-1 hover:bg-gray-400 font-semibold"
                          onClick={() =>
                            router.push(`/sign-up?eventID=${event.eventID}`)
                          }
                        >
                          SIGN UP
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        router.push("/my-events");
                      }}
                      className="text-lg mt-2 bg-gray-300 px-4 p-2 font-semibold hover:bg-gray-400"
                    >
                      MY EVENTS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = process.env.VERCEL_URL || "localhost:3000";
  const url = `${protocol}://${host}/api/get-event`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      // If the response status code is not OK, an error will be thrown (not sure how to code this part)
      throw new Error(`Failed to fetch events: ${res.status}`);
    }

    const events = await res.json();

    return { props: { events } };
  } catch (error) {
    console.error("Error fetching events:", error);

    // Return empty array or error information as a fallback (not sure how to code this part)
    return { props: { events: [], error: error.message } };
  }
}

export default EventsPage;

// "use client";

// import { useRouter } from "next/router";
// import React from "react";

// import Image from "next/image";
// import product1 from "@/app/assets/img/product1.jpg";

// function EventsPage({ events }) {
//   const router = useRouter();

//   const handleLogout = () => {
//     // Clear the isAdmin flag from localStorage
//     localStorage.removeItem("isAdmin");

//     // Redirect to the Home or Login page
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
//             href="/events"
//             className="pt-4 text-sm text-black"
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
//         <div className="flex flex-1 m-8 bg-gray-300">
//           <div className="m-auto w-11/12 relative">
//             <div className="">
//               <div className="flex">
//                 <div className="w-1/2">
//                   <Image
//                     src={product1}
//                     alt="photo"
//                     className=""
//                     style={{ maxWidth: "400px", maxHeight: "1700px" }} // Adjust dimensions as needed
//                   />
//                 </div>
//                 <div className="w-1/2">
//                   <div className="w-1/2 relative">
//                     <Image
//                       src={product1}
//                       alt="photo"
//                       className=""
//                       style={{ maxWidth: "400px", maxHeight: "1200px" }} // Adjust dimensions as needed
//                     />
//                     <div className="absolute bottom-0 right-4 p-4">
//                       <button
//                         onClick={(e) => {
//                           e.preventDefault();
//                           router.push("/myevents");
//                         }}
//                         className="bg-gray-200 py-1 px-2 text-md font-semibold ml-8 hover:bg-gray-100"
//                       >
//                         MY EVENTS
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute top-0 left-0 right-0 bg-gray-200 bg-opacity-40 p-4 text-white text-2xl font-bold">
//                 <div className="text-center">
//                   <h2 className="text-center text-4xl p-1 font-bold leading-9 tracking-tight text-black">
//                     Upcoming Events
//                   </h2>
//                 </div>
//               </div>
//               <div className="">
//                 <div className="mt-16">
//                   {events.map((event) => (
//                     <div
//                       key={event.eventID}
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         marginBottom: "40px",
//                       }}
//                     >
//                       <div>
//                         <h2 className="text-2xl font-bold">{event.title}</h2>
//                         <p className="text-lg">
//                           {event.date} at {event.time}
//                         </p>
//                         <p>"{event.description}"</p>
//                       </div>

//                       <button
//                         className="bg-gray-200 px-2 py-1 hover:bg-gray-100 font-semibold"
//                         onClick={() =>
//                           router.push(`/sign-up?eventID=${event.eventID}`)
//                         }
//                       >
//                         SIGN UP
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export async function getServerSideProps() {
//   const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
//   const host = process.env.VERCEL_URL || "localhost:3000";
//   const url = `${protocol}://${host}/api/get-event`;

//   try {
//     const res = await fetch(url);

//     if (!res.ok) {
//       // If the response status code is not OK, an error will be thrown (not sure how to code this part)
//       throw new Error(`Failed to fetch events: ${res.status}`);
//     }

//     const events = await res.json();

//     return { props: { events } };
//   } catch (error) {
//     console.error("Error fetching events:", error);

//     // Return empty array or error information as a fallback (not sure how to code this part)
//     return { props: { events: [], error: error.message } };
//   }
// }

// export default EventsPage;
