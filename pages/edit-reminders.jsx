import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import img3 from "@/app/assets/img3.jpg";

const EditRemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetching the reminders from the API
    const fetchReminders = async () => {
      const response = await fetch("/api/reminders");
      const data = await response.json();
      //     const data = await response.json();
      //     // setReminders(data.reminders);
      //     setReminders(data);
      //   };

      //   fetchReminders();
      // }, []);
      if (data && data.reminders) {
        setReminders(data.reminders);
      }
    };
    fetchReminders();
  }, []);

  console.log(reminders);

  // const handleEdit = (reminderId) => {
  //   // Redirect to the edit page for the reminder
  //   router.push(`/edit-reminders/${reminderId}`);
  // };

  const handleEdit = (reminderId) => {
    console.log("Editing reminder with ID:", reminderId);
    if (reminderId) {
      router.push(`/edit-reminders/${reminderId}`);
    } else {
      console.error("Undefined reminder ID");
    }
  };

  // const handleDelete = async (reminderId) => {
  //   // Calling the API to delete the reminder
  //   await fetch(`/api/reminders/${reminderId}`, {
  //     method: "DELETE",
  //   });
  //   // Filter out the deleted reminder
  //   setReminders(
  //     reminders.filter((reminder) => reminder.reminderId !== reminderId)
  //   );
  // };

  // const handleDelete = async (reminderId) => {
  //   // console.log("Sending DELETE request for reminderId:", reminderId);

  //   try {
  //     console.log(`Deleting reminder with ID: ${reminderId}`);
  //     const response = await fetch(`/api/reminders/${reminderId}`, {
  //       method: "DELETE",
  //     });

  //     if (response.ok) {
  //       // If the delete is successful, remove the reminder from the state
  //       setReminders(
  //         reminders.filter((reminder) => reminder.reminderId !== reminderId)
  //       );
  //     } else {
  //       // If the server response is not ok, log the error response
  //       const errorData = await response.json();
  //       console.error("Failed to delete reminder:", errorData.error);
  //     }
  //   } catch (error) {
  //     // Catch and log any errors during the fetch request
  //     console.error("Error during deletion:", error);
  //   }
  // };

  const handleDelete = async (reminderId) => {
    try {
      // Show a confirmation dialog before proceeding with deletion
      const confirmed = window.confirm(
        "Are you sure you want to delete this reminder?"
      );
      if (!confirmed) {
        // If the user cancels, exit the function
        return;
      }

      console.log(`Deleting reminder with ID: ${reminderId}`);
      const response = await fetch(`/api/reminders/${reminderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // If the delete is successful, remove the reminder from the state
        setReminders(
          reminders.filter((reminder) => reminder.reminderId !== reminderId)
        );
      } else {
        // If the server response is not ok, log the error response
        const errorData = await response.json();
        console.error("Failed to delete reminder:", errorData.error);
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
              href="/edit-events"
              className="pt-4 text-sm"
              onClick={(e) => {
                e.preventDefault();
                router.push("/edit-events");
              }}
            >
              Events
            </a>
            <a
              href="/edit-reminders"
              className="pt-4 text-sm text-black"
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
          src={img3}
          alt="Background"
          layout="fill" // Make image fill the div
          objectFit="cover" // Cover the area without stretching
          className="absolute z-0 opacity-90" // Absolute but behind the form (z-index 0)
          style={{ maxWidth: "", maxHeight: "1700px" }} // Adjust dimensions as needed
        />

        <div className="flex flex-1 items-center justify-center mt-8">
          <div className="m-auto w-11/12">
            <div className="bg-gray-300 opacity-80 py-10 px-80">
              <div className="mx-auto w-full max-w-xl">
                <div className="bg-gray-100 bg-opacity-60 px-20 p-2">
                  <h2 className="text-center text-4xl p-1 font-bold leading-9 tracking-tight text-black">
                    Reminders
                  </h2>
                </div>
                <div className="flex justify-center mt-16">
                  <ul className="w-full">
                    {reminders.map((reminder) => (
                      <li
                        key={reminder.reminderId}
                        className="flex justify-between items-center bg-gray-200 px-6 py-2 my-2 shadow mt-8"
                      >
                        <span className="text-xl font-semibold">
                          {reminder.reminderTitle}{" "}
                        </span>
                        <div className="flex">
                          <button
                            className="bg-yellow-400 py-1 px-2 hover:bg-yellow-500 text-white font-semibold mr-1"
                            onClick={() => handleEdit(reminder.reminderId)}
                          >
                            EDIT
                          </button>
                          <button
                            className="bg-red-500 py-1 px-2 hover:bg-red-600 text-white font-semibold ml-1"
                            onClick={() => handleDelete(reminder.reminderId)}
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
    </main>
  );
};

export default EditRemindersPage;
