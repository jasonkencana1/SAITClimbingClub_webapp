// import Link from "next/link";
// import { useSession } from "next-auth/react";

// const ProfilePage = () => {
//   const { data: session, status } = useSession();

//   // If session is loading, display a loading indicator
//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   // If session is not loaded or user is not authenticated, prompt user to sign in
//   if (!session) {
//     return <div>Please sign in to view this page</div>;
//   }

//   // If session exists, render the profile information
//   return (
//     <div>
//       <h1>Profile</h1>
//       <p>Username: {session.user.username}</p>
//       <p>Email: {session.user.email}</p>
//       <Link href="/profile/edit">
//         <a>Edit Profile</a>
//       </Link>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Profile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    if (userId) {
      fetch(`/api/user/${userId}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error("Error fetching user data:", err));
    } else {
      router.push("/login");
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center text-4xl font-bold">Loading..</div>
    );
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
            className="pt-4 text-sm text-black"
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

        <div className="flex flex-1 m-8">
          <div className="m-auto w-11/12">
            <div className="bg-gray-300 opacity-80 py-10 px-80">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-100 bg-opacity-60 px-20">
                  <h2 className="text-center text-5xl p-2 py-3 font-bold leading-9 tracking-tight text-black">
                    Profile
                  </h2>
                </div>
              </div>

              <div className="container mx-auto pt-16 pb-6">
                <div className="w-full md:w-1/2 lg:w-2/3 mx-auto bg-white rounded-lg shadow">
                  <div className="py-4 px-8 text-black text-xl border-b border-gray-300">
                    <h3 className="text-3xl text-center font-bold my-4 underline">
                      Profile Details
                    </h3>
                  </div>

                  <div className="py-8 px-8">
                    <div className="mb-4">
                      <span className="text-gray-700 text-sm font-bold">
                        <h3 className="mb-2">Username:</h3>
                      </span>
                      <p className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        {user.username}
                      </p>
                    </div>
                    <div className="mb-4">
                      <span className="text-gray-700 text-sm font-bold">
                        <h3 className="mb-2">Email:</h3>
                      </span>
                      <p className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        {user.email}
                      </p>
                    </div>
                    <div className="flex justify-between pt-10">
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
                        onClick={() => router.push("/profile-edit")}
                      >
                        EDIT
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4"
                        onClick={() => router.push("/dashboard")}
                      >
                        BACK
                      </button>
                    </div>
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

export default Profile;
