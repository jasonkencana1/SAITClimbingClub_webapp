"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import img7 from "@/assets/img7.jpg";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleUserCreation = async (event) => {
    if (!username || !email || !password)
      return alert("Please fill in all fields");

    event.preventDefault();
    const response = await fetch("/api/create-user/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      alert("User has been created successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      router.push("/login");
    } else if (response.status === 409) {
      alert("Username already exists. Please choose a different one.");
    } else {
      const error = await response.json();
      console.error("Server response:", error);
      alert(`Something went wrong: ${error.message}`);
    }
  };

  return (
    // <main className="min-h-screen flex flex-col">
    //   <div className="bg-gray-100 flex-grow">
    //     <h1 className="flex justify-between bg-orange-800 pt-4 pb-2 px-4 text-center text-2xl text-white font-bold">
    //       <button
    //         href="/"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           router.push("/");
    //         }}
    //       >
    //         SAIT Climbing Club
    //       </button>
    //       <a
    //         href="/"
    //         className="pt-4 text-sm"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           router.push("/");
    //         }}
    //       >
    //         Home
    //       </a>
    //       <a
    //         href="/login"
    //         className="pt-4 text-sm text-black"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           router.push("/login");
    //         }}
    //       >
    //         Login
    //       </a>
    //     </h1>
    //     <div className="relative">
    //       <Image
    //         src={img7}
    //         alt="photo"
    //         className="w-full h-auto"
    //         style={{maxWidth: "100%", maxHeight: "450px"}}
    //         />
    //       <div className="absolute top-3/4 left-0 right-0 bottom-0 flex items-center justify-center">
    //         <div className="bg-gray-300 opacity-80 py-10 px-8 sm:px-12 md:px-20 lg:px-32">
    //           <div className="sm:mx-auto sm:w-full sm:max-w-md">
    //             <div className="bg-gray-100 bg-opacity-60 px-20 py-4">
    //               <h2 className="mt-2 text-center text-5xl p-2 font-bold leading-9 tracking-tight text-black whitespace-nowrap">
    //                 Register Today
    //               </h2>
    //             </div>
    //           </div>

    //           <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //             {/* FORM BEGINS HERE */}
    //             <form className="space-y-6" onSubmit={handleUserCreation}>
    //               <div>
    //                 <label
    //                   htmlFor="username"
    //                   className="block text-sm font-medium leading-6 text-gray-900"
    //                 >
    //                   {/* Username */}
    //                 </label>
    //                 <div className="mt-2">
    //                   <input
    //                     id="username"
    //                     name="username"
    //                     type="text"
    //                     placeholder=" Username.."
    //                     required
    //                     value={username}
    //                     onChange={(e) => {
    //                       setUsername(e.target.value);
    //                     }}
    //                     className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   />
    //                 </div>
    //               </div>

    //               <div>
    //                 <label
    //                   htmlFor="email"
    //                   className="block text-sm font-medium leading-6 text-gray-900"
    //                 >
    //                   {/* Email Address */}
    //                 </label>
    //                 <div className="mt-2">
    //                   <input
    //                     id="email"
    //                     name="email"
    //                     type="email"
    //                     autoComplete="email"
    //                     placeholder=" Email Address.."
    //                     required
    //                     value={email}
    //                     onChange={(e) => {
    //                       setEmail(e.target.value);
    //                     }}
    //                     className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   />
    //                 </div>
    //               </div>

    //               <div>
    //                 <div className="flex items-center justify-between">
    //                   <label
    //                     htmlFor="password"
    //                     className="block text-sm font-medium leading-6 text-gray-900"
    //                   >
    //                     {/* Password */}
    //                   </label>
    //                 </div>
    //                 <div>
    //                   <input
    //                     id="password"
    //                     name="password"
    //                     type="password"
    //                     autoComplete="current-password"
    //                     placeholder=" Password.."
    //                     required
    //                     value={password}
    //                     onChange={(e) => {
    //                       setPassword(e.target.value);
    //                     }}
    //                     className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   />
    //                 </div>
    //               </div>

    //               <p className="mt-10 text-center text-sm font-semibold text-black">
    //                 Please fill out the form to get started on your climbing
    //                 journey!
    //               </p>

    //               <div className="flex justify-center pt-2">
    //                 <button
    //                   type="submit"
    //                   className="flex w-1/2 justify-center bg-gray-100 px-3 py-1.5 text-lg font-semibold leading-6 text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //                 >
    //                   REGISTER
    //                 </button>
    //               </div>

    //               <div>
    //                 <p className="mt-6 text-center text-sm text-black">
    //                   Already have an account?{" "}
    //                   <a
    //                     href="/login"
    //                     className="font-semibold leading-6 text-gray-600 hover:text-gray-900 underline"
    //                   >
    //                     Click Here
    //                   </a>
    //                 </p>
    //               </div>

    //               <div className="flex justify-center">
    //                 <a
    //                   href="/login"
    //                   className="flex w-1/2 justify-center bg-gray-100 px-3 py-1.5 text-lg font-semibold leading-6 text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //                   onClick={(e) => {
    //                     e.preventDefault();
    //                     router.push("/login");
    //                   }}
    //                 >
    //                   LOG IN
    //                 </a>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </main>

    <main className="min-h-screen flex flex-col">
      <div className="bg-gray-100 flex-grow">
        <nav className="z-10 relative">
          <h1 className="flex justify-between bg-orange-800 pt-4 pb-2 px-4 text-center text-2xl text-white font-bold">
            <button
              href="/"
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
            >
              SAIT Climbing Club
            </button>
            <a
              href="/"
              className="pt-4 text-sm"
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
            >
              Home
            </a>
            <a
              href="/login"
              className="pt-4 text-sm text-black"
              onClick={(e) => {
                e.preventDefault();
                router.push("/login");
              }}
            >
              Login
            </a>
          </h1>
        </nav>
        <Image
          src={img7}
          alt="Background"
          layout="fill" // Make image fill the div
          objectFit="cover" // Cover the area without stretching
          className="absolute z-0 opacity-90" // Absolute but behind the form (z-index 0)
          style={{ maxWidth: "", maxHeight: "1700px" }} // Adjust dimensions as needed
        />

        <div className="flex flex-1 items-center mt-10 justify-center">
          <div className="m-auto w-11/12 z-10 relative opacity-80">
            <div className="bg-gray-300 py-20 px-80 shadow-lg">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-100 bg-opacity-80 px-20">
                  <h2 className="mt-10 text-center text-4xl p-2 font-bold leading-9 tracking-tight text-black">
                    Register Today
                  </h2>
                </div>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {/* FORM BEGINS HERE */}
                <form className="space-y-6" onSubmit={handleUserCreation}>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {/* Username */}
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder=" Username.."
                        required
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {/* Email Address */}
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder=" Email Address.."
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {/* Password */}
                      </label>
                    </div>
                    <div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder=" Password.."
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <p className="mt-10 text-center text-sm font-semibold text-black">
                    Please fill out the form to get started on your climbing
                    journey!
                  </p>

                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      className="flex w-1/2 justify-center bg-gray-100 px-3 py-1.5 text-lg font-semibold leading-6 text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      REGISTER
                    </button>
                  </div>

                  <div>
                    <p className="mt-6 text-center text-sm text-black">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="font-semibold leading-6 text-gray-600 hover:text-gray-900 underline"
                      >
                        Click Here
                      </a>
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <a
                      href="/login"
                      className="flex w-1/2 justify-center bg-gray-100 px-3 py-1.5 text-lg font-semibold leading-6 text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push("/login");
                      }}
                    >
                      LOG IN
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateUser;
