"use client";
 
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import img7 from "@/app/assets/img7.jpg";
 
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const router = useRouter();
 
const { data: session, status } = useSession();
console.log(session, status); // Check the session state and status
 
  const handleLogin = async (event) => {
    event.preventDefault();
 
    const response = await fetch("/api/login/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
 
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('userId', data.userId);
    // Store the isAdmin flag in localStorage for client-side checks
    localStorage.setItem('isAdmin', data.isAdmin);
 
    if (data.isAdmin) {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  } else {
    const error = await response.json();
    console.error("Server response:", error);
    alert(`Something went wrong: ${error.message}`);
  }
};
 
  return (
    <main className="min-h-screen flex flex-col">
      <div className="bg-gray-100 flex-grow">
      <nav className="z-10 relative">
        <h1 className="flex justify-between bg-orange-800 pt-4 pb-2 px-4 text-center text-2xl text-white font-bold">
          <button
            href="/"
            onClick={(e) => {
              e.preventDefault();
              router.push("/");
            }}>
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
                <div className="bg-gray-100 bg-opacity-60 px-20">
                  <h2 className="mt-10 text-center text-4xl p-2 font-bold leading-9 tracking-tight text-black">
                    Member Login
                  </h2>
                </div>
              </div>
 
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm pb-10">
                {/* FORM BEGINS HERE */}
                <form className="space-y-6" onSubmit={handleLogin}>
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
                        type="username"
                        autoComplete="username"
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
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {/* Password */}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder=" Password.."
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value );
                        }}
                        className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
 
                  {/* Buttons */}
                  <div className="flex justify-center pt-5">
                    <button
                      type="submit"
                      className="flex w-1/2 justify-center bg-gray-100 px-3 py-1.5 text-lg font-semibold leading-6 text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      LOG IN
                    </button>
                  </div>
 
                  <div className="flex justify-center pt-3">
                    <a
                      href="/create-user"
                      className="flex w-1/2 justify-center bg-gray-100 px-3 py-1.5 text-lg font-semibold leading-6 text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push("/create-user");
                      }}
                    >
                      REGISTER
                    </a>
                  </div>
 
                  <p className="pt-4 text-center text-sm text-black">
                    Don't have an account?{" "}
                    <a
                      href="/create-user"
                      className="font-semibold leading-6 text-gray-600 hover:text-gray-900 underline"
                    >
                      Click Here
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
 
export default Login;