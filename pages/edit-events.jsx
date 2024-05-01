import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import img4 from "@/assets/img4.jpg";

const EditEventsPage = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetching the events from the API
    const fetchEvents = async () => {
      const response = await fetch("/api/events");
      const data = await response.json();
      if (data && data.events) {
        setEvents(data.events);
      }
    };
    fetchEvents();
  }, []);

  console.log(events);

  const handleEdit = (eventID) => {
    console.log("Editing event with ID:", eventID);
    if (eventID) {
      router.push(`/edit-events/${eventID}`);
    } else {
      console.error("Undefined event ID");
    }
  };

  const handleDelete = async (eventID) => {
    try {
      console.log("eventID received:", eventID);
      // Show a confirmation dialog before proceeding with deletion
      const confirmed = window.confirm(
        "Are you sure you want to delete this event?"
      );
      if (!confirmed) {
        // If user cancels, exit the function
        return;
      }

      console.log(`Deleting event with ID: ${eventID}`);
      const response = await fetch(`/api/events/${eventID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // If the delete is successful, remove the event from the state
        setEvents(events.filter((event) => event.eventID !== eventID));
      } else {
        // If the server response is not ok, log the error response
        const errorData = await response.json();
        console.error("Failed to delete event:", errorData.error);
      }
    } catch (error) {
      // Catch and log any errors during the fetch request
      console.error("Error during deletion:", error);
    }
  };

  const handleLogout = () => {
    // Clear the isAdmin flag from localStorage
    localStorage.removeItem("isAdmin");

    // Redirect to the Login page
    router.push("/login");
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <nav className="z-10 relative">
          <h1 className="flex justify-between bg-orange-800 pt-4 pb-2 px-4 text-center text-2xl text-white font-bold mb-14">
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
        </nav>
        <Image
            src={img4}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="absolute z-0 opacity-90"
            style={{ maxWidth: "", maxHeight: "1700px" }} // Adjust dimensions as needed
          />
        <div className="relative flex-grow">
          

          <div className="flex flex-1 items-center justify-center ">
            <div className="m-auto w-11/12 z-10 relative">
              <div className="bg-gray-300 opacity-80 py-10 px-80">
                <div className="mx-auto w-full max-w-xl">
                  <div className="bg-gray-100 bg-opacity-60 px-20 p-2">
                    <h2 className="text-center text-4xl p-1 font-bold leading-9 tracking-tight text-black">
                      Events
                    </h2>
                  </div>
                  <div className="flex justify-center mt-16">
                    <ul className="w-full">
                      {events.map((event) => (
                        <li
                          key={event.eventID}
                          className="flex justify-between items-center bg-gray-200 px-6 py-2 my-2 shadow mt-8"
                        >
                          <span className="text-xl font-semibold">
                            {event.title}{" "}
                          </span>
                          <div className="flex">
                            <button
                              className="bg-yellow-400 py-1 px-2 hover:bg-yellow-500 text-white font-semibold mr-1"
                              onClick={() => handleEdit(event.eventID)}
                            >
                              EDIT
                            </button>
                            <button
                              className="bg-red-500 py-1 px-2 hover:bg-red-600 text-white font-semibold ml-1"
                              onClick={() => handleDelete(event.eventID)}
                            >
                              DELETE
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-center mt-24">
                  <button
                    className="bg-gray-200 py-1 px-2 hover:bg-gray-100 font-semibold ml-1"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/admin");
                    }}
                  >
                    ADMIN DASHBOARD
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

export default EditEventsPage;
