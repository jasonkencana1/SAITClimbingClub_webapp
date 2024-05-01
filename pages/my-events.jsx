import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MyEvents = () => {
  const router = useRouter();
  const [userEvents, setUserEvents] = useState([]);
  const [user, setUser] = useState(null); // State to hold the user details

  // Fetch registered events
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`/api/user-events?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserEvents(data);
        })
        .catch((err) =>
          console.error("Error fetching registered events:", err)
        );
    } else {
      console.log("No User ID found. Redirect to Login.");
      // Redirect to login or show a message indicating that the user is not logged in
      router.push("/login");
    }
  }, []);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const res = await fetch(`/api/user/${userId}`);
        const data = await res.json();
        setUser(data); // Set user data to state
      } else {
        console.log("No user id found. Redirect to login.");
        router.push("/login");
      }
    };
    
    fetchUser();
  }, []);

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
          <div className="m-auto">
            <div className="py-6 px-80">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-100 bg-opacity-50 px-20 p-4 mt-4">
                  <h2 className="text-center text-4xl p-1 font-bold leading-9 tracking-tight text-black">
                    My Events
                  </h2>
                </div>
              </div>

              <div className="bg-gray-200 p-4 border rounded-lg mt-16 mb-10">
                <h1 className="text-gray-500 font-semibold text-2xl">
                  <div className="flex flex-row">
                  <div>UPCOMING EVENTS FOR</div>
                  <div className="underline pl-2 uppercase">{user?.username}:</div>
                  </div>
                </h1>
                <div>
                  <ul className="mb-4">
                    {userEvents.map((event) => (
                      <li key={event.eventID} className="my-8">
                        <div className="flex flex-row text-xl font-semibold underline">
                          <h2 className="">Title:</h2>
                          <h2 className="pl-2">{event.title}</h2>
                        </div>
                        <div className="flex flex-row text-lg">
                          <h2 className="font-semibold">Date/Time:</h2>
                          <p className="pl-2">
                            {event.date} at {event.time}
                          </p>
                        </div>
                        <div className="flex flex-row text-lg">
                          <h2 className="font-semibold">Description:</h2>
                          <p className="pl-2">{event.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center mb-4 mt-10">
                  <button
                    href="/events"
                    className="bg-gray-400 hover:bg-gray-500 px-2 py-1 text-xl font-bold text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/events");
                    }}
                  >
                    <a>BACK TO EVENTS</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyEvents;
