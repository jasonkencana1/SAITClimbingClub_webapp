// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const router = useRouter();

//   // Retrieve the Username from localStorage
//   const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;

//   const handleLogout = () => {
//     // Clear the isAdmin flag from localStorage
//     localStorage.removeItem("isAdmin");

//     // Redirect to the Login page
//     router.push("/login");
//   };

//   return (
//     <main className="min-h-screen flex flex-col">
//       <div className="">
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
//             className="pt-4 text-sm text-black"
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
//             className="pt-4 text-sm"
//             onClick={(e) => {
//               e.preventDefault();
//               router.push("/events");
//             }}
//           >
//             Events
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
//           <div className="m-auto">
//             <div className="py-10 px-80">
//               <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
//                 <div className="bg-gray-200 bg-opacity-50 px-20 p-4">
//                   <h2 className="mt-2 text-center text-4xl p-1 font-bold leading-9 tracking-tight text-black">
//                     Welcome Back! {/* {session?.user.name} */}
//                   </h2>
//                   <h3 className="text-center text-2xl mt-6">
//                     "Best decision I've ever made!"
//                   </h3>
//                   <h3 className="text-center text-2xl">- John Doe</h3>
//                 </div>
//               </div>

//               <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl border-2 border-orange-800 p-4">
//                 <div>
//                   <h2 className="text-center text-2xl font-semibold">
//                     Getting to Know Us..
//                   </h2>
//                   <p className="mt-10">
//                     Welcome to the SAIT Climbing Club, where adventure meets
//                     camaraderie! Our club is a tight-knit community of
//                     passionate climbers, ranging from beginners eager to conquer
//                     their first climb to seasoned enthusiasts seeking new
//                     challenges. We believe in fostering a supportive environment
//                     where everyone can share their love for climbing, exchange
//                     tips and tricks, and forge lasting connections. Whether
//                     you're a seasoned pro or just getting started, our club is
//                     all about encouraging personal growth, conquering heights
//                     together, and creating memories that last a lifetime. Join
//                     us for thrilling climbs, exciting events, and a fantastic
//                     community that shares your passion for reaching new
//                     heights!"
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import img5 from "@/assets/img5.jpg";
import img6 from "@/assets/img6.jpg";

export default function Dashboard() {
  const router = useRouter();

  // Retrieve the Username from localStorage
  const username =
    typeof window !== "undefined" ? localStorage.getItem("username") : null;

  const handleLogout = () => {
    // Clear the isAdmin flag from localStorage
    localStorage.removeItem("isAdmin");

    // Redirect to the Login page
    router.push("/login");
  };

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
        <div className="relative">
          <Image
            src={img5}
            alt="photo"
            className="w-full h-auto"
            style={{ maxWidth: "100%", maxHeight: "450px" }}
          />
        </div>

        <div className="absolute top-20 right-0 p-12">
          <div className="bg-gray-200 bg-opacity-40 p-4 text-2xl font-bold">
            <div className="text-center">
              <h2 className="mt-2 text-4xl p-1">
                Welcome Back to Your Addiction!
              </h2>
              <h3 className="text-3xl mt-6 font-semibold description-text">
                "Best decision I've ever made!"
              </h3>
              <h3 className="text-3xl font-semibold description-text mt-2">
                - John Doe
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="flex items-center mt-8">
          <div className="bg-brown bg-opacity-90 p-10 pl-32">
            <Image
              src={img6}
              alt="photo"
              className="w-full h-auto"
              style={{ width: "400px", height: "300px" }}
            />
          </div>
          <div className="absolute right-8 p-4 mt-10 sm:mx-auto sm:w-full sm:max-w-xl border-4 border-orange-800 description-text">
            <div>
              <h2 className="text text-2xl font-semibold">
                Getting to Know Us..
              </h2>
              <p className="mt-10">
                Welcome to the SAIT Climbing Club, where adventure meets
                camaraderie!
              </p>
              <p className="mt-10">
                Our club is a tight-knit community of passionate climbers,
                ranging from beginners eager to conquer their first climb to
                seasoned enthusiasts seeking new challenges. We believe in
                fostering a supportive environment where everyone can share
                their love for climbing, exchange tips and tricks, and forge
                lasting connections. Whether you're a seasoned pro or just
                getting started, our club is all about encouraging personal
                growth, conquering heights together, and creating memories that
                last a lifetime. Join us for thrilling climbs, exciting events,
                and a fantastic community that shares your passion for reaching
                new heights!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
