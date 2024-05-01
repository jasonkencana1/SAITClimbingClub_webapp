import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import img1 from "@/app/assets/img1.jpg";
import img2 from "@/app/assets/img2.jpg";

const EditReminderPage = () => {
  const [reminderData, setReminderData] = useState({ text: "", date: "" });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Fetch the specific reminder details from your API
    const fetchReminderDetails = async () => {
      const response = await fetch(`/api/reminders/${id}`);
      const data = await response.json();
      setReminderData(data);
    };

    if (id) {
      fetchReminderDetails();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Updating reminder with data:", reminderData);

    try {
      const response = await fetch(`/api/reminders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reminderTitle: reminderData.reminderTitle }),
      });

      if (response.ok) {
        // If the update is successful, fetch the updated reminders list or redirect
        console.log("Reminder updated successfully");
        router.push("/edit-reminders"); // Make sure this is the correct route
      } else {
        // Handle errors if the response is not okay
        const errorData = await response.json();
        console.error("Failed to update reminder:", errorData);
      }
    } catch (error) {
      // Catch and log any errors during the fetch request
      console.error("Error submitting form:", error);
    }
  };

  // Call your API to update the reminder
  //   await fetch(`/api/reminders/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ reminderTitle: reminderData.reminderTitle }),
  //   });
  //   router.push("/edit-reminders"); // Redirect back to the list after update
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReminderData({ ...reminderData, [name]: value });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEventData((prevEventData) => ({
  //     ...prevEventData,
  //     [name]: value,
  //   }));
  // };

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

        <div className="bg-gray-300 flex flex-1 flex-col m-8">
          <div className="m-auto w-11/22 relative">
            <div className="relative m-8">
              <div className="flex">
                <div className="w-1/2">
                  <Image
                    src={img2}
                    alt="photo"
                    style={{ maxWidth: "400px", maxHeight: "1700px" }}
                  />
                </div>
                <div className="w-1/2">
                  <div className="w-1/2 relative">
                    <Image
                      src={img1}
                      alt="photo"
                      style={{ maxWidth: "400px", maxHeight: "1700px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center m-8 p-4 bg-gray-200 border rounded-lg">
                <div className="">
                  <div className="">
                    <div className="bg-gray-200 p-6">
                      <form onSubmit={handleSubmit}>
                        <h2 className="flex justify-center mb-10 text-xl font-bold px-20">
                          Reminder Title:
                        </h2>
                        <label htmlFor="text" className="text-xl font-semibold">
                          {" "}
                        </label>
                        <div className="flex justify-center">
                          <input
                            id="reminderTitle"
                            name="reminderTitle"
                            type="text"
                            value={reminderData.reminderTitle}
                            onChange={handleChange}
                            placeholder="Title.."
                            className="text-xl w-full pl-1"
                            required
                          />
                        </div>
                        <div className="mt-10 flex justify-between">
                          <button
                            type="submit"
                            className="bg-green-500 py-1 px-2 font-semibold hover:bg-green-600 text-white"
                          >
                            UPDATE REMINDER
                          </button>
                          <button
                            className="bg-red-500 py-1 px-2 text-white text-md font-semibold hover:bg-red-600"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/edit-reminders");
                            }}
                          >
                            CANCEL
                          </button>
                        </div>
                      </form>
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

export default EditReminderPage;
