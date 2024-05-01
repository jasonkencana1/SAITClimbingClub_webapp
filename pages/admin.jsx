// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// const AdminPage = () => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const router = useRouter();

//   const handleLogout = () => {
//     // Clear the isAdmin flag from localStorage
//     localStorage.removeItem("isAdmin");

//     // Redirect to the home or login page
//     router.push("/login");
//   };

//   useEffect(() => {
//     const adminFlag = localStorage.getItem("isAdmin");
//     setIsAdmin(adminFlag === "true");

//     // If the user is not an admin, they will redirect to the Login page
//     if (adminFlag !== "true") {
//       router.push("/login");
//     }
//   }, [router]);

//   if (!isAdmin) {
//     return null;
//   }

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
//         <div className="flex flex-1 m-8">
//           <div className="m-auto w-11/12">
//             <div className="bg-gray-300 opacity-80 py-10 px-80">
//               <div className="mx-auto w-full max-w-2xl">
//                 <div className="bg-gray-100 bg-opacity-80 px-20 p-4">
//                   <h2 className="mt-2 text-center text-4xl p-1 font-bold leading-9 tracking-tight text-black">
//                     Admin Dashboard
//                   </h2>
//                 </div>
//                 <div className="pt-52">
//                   <div className="flex flex-row justify-between font-semibold">
//                     <div className="bg-gray-100 hover:bg-gray-200">
//                       <button
//                         onClick={(e) => {
//                           e.preventDefault();
//                           router.push("/create-event");
//                         }}
//                         className="p-2"
//                       >
//                         EVENT CREATION
//                       </button>
//                     </div>
//                     <div className="bg-gray-100 hover:bg-gray-200">
//                       <button
//                         onClick={(e) => {
//                           e.preventDefault();
//                           router.push("/create-reminder");
//                         }}
//                         className="p-2"
//                       >
//                         REMINDER CREATION
//                       </button>
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

// export default AdminPage;

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import img4 from "@/app/assets/img4.jpg";
import img1 from "@/app/assets/img1.jpg";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

  useEffect(() => {
    const adminFlag = localStorage.getItem("isAdmin");
    setIsAdmin(adminFlag === "true");

    // If the user is not an admin, they will redirect to the Login page
    if (adminFlag !== "true") {
      alert("You must be an administrator to access this.");
      router.push("/dashboard");
    }
  }, [router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="bg-gray-100 flex-grow">
        <h1 className="flex justify-between bg-orange-800 pt-4 pb-2 px-4 text-center text-2xl text-white font-bold">
          SAIT Climbing Club
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
            className="pt-4 text-sm text-black"
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
            href="/events"
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

        <div className="bg-gray-300 m-8 p-4 flex flex-col">
          <div className="text-center mb-8 my-8">
            <div className="py-2">
            <h2 className="text-4xl font-bold leading-9 tracking-tight text-black underline">
              Admin Dashboard
            </h2>
            </div>
          </div>

          <div className="flex justify-between my-14 mx-4 mb-20">
            <div className="w-1/2 h-96 relative">
              <Image
                src={img4}
                alt="photo"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/create-event");
                  }}
                  className="text-2xl font-bold text-black bg-white opacity-80 py-2 px-4"
                  style={{ top: '50%', transform: 'translateY(-80%)' }}
                >
                  EVENT CREATION
                </button>
              </div>
            </div>

            <div className="w-1/2 h-96 relative">
              <Image
                src={img1}
                alt="Reminder Creation"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/create-reminder");
                  }}
                  className="text-2xl font-bold text-black bg-white opacity-80 py-2 px-4"
                  style={{ top: '50%', transform: 'translateY(-80%)' }}
                >
                  REMINDER CREATION
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
