// import { useState } from "react";
// import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";

// const EditProfilePage = () => {
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const [username, setUsername] = useState(session.user.username);
//   const [email, setEmail] = useState(session.user.email);
//   const [password, setPassword] = useState("");

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(`/api/users/${session.user.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, email, password }),
//       });
//       if (response.ok) {
//         // Redirect to profile page after successful update
//         router.push("/profile");
//       } else {
//         const errorData = await response.json();
//         console.error("Error updating profile:", errorData.message);
//         // Handle error response
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       // Handle other errors
//     }
//   };

//   return (
//     <div>
//       <h1>Edit Profile</h1>
//       <form onSubmit={handleFormSubmit}>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Save Changes</button>
//       </form>
//     </div>
//   );
// };

// export default EditProfilePage;

// // THIS IS WORKING
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// const ProfileEdit = () => {
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const router = useRouter();

//   // Function to fetch user data
//   const fetchUserData = async () => {
//     const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage
//     if (!userId) {
//       router.push('/login'); // Redirect to login if no userId is found
//       return;
//     }

//     try {
//       const res = await fetch(`/api/user/${userId}`);
//       if (!res.ok) {
//         throw new Error('Failed to fetch user data');
//       }
//       return await res.json();
//     } catch (error) {
//       console.error('Error during update:', error);
//       res.status(500).json({ message: 'Error updating user', error: error.message });
//     }
//   };

//   // Fetch user data on component mount
//   useEffect(() => {
//     fetchUserData().then(userData => {
//       if (userData) {
//         setForm(prevForm => ({
//           ...prevForm,
//           username: userData.username,
//           email: userData.email,
//         }));
//       }
//     });
//   }, []);

//   const handleSubmit = async event => {
//     event.preventDefault();
//     console.log('Form data:', form);
//     const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage

//     // Make sure the userId is retrieved correctly
//   if (!userId) {
//     console.error('No userId found in localStorage');
//     return;
//   }

//     // Call your API to update the user profile
//     const response = await fetch(`/api/user/${userId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({userId, form}),
//     });

//     if (response.ok) {
//       // Handle success - perhaps redirect to the profile page or show a success message
//       router.push('/profile');
//     } else {
//       // Handle error - display error message to the user
//       const errorData = await response.json();
//       console.error('Failed to update profile', errorData);
//     }
//   };

//   const handleChange = event => {
//     const { name, value } = event.target;
//     setForm(prevForm => ({ ...prevForm, [name]: value }));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="username">Username:</label>
//       <input
//         type="text"
//         id="username"
//         name="username"
//         value={form.username}
//         onChange={handleChange}
//       />

//       <label htmlFor="email">Email:</label>
//       <input
//         type="email"
//         id="email"
//         name="email"
//         value={form.email}
//         onChange={handleChange}
//       />

//       <label htmlFor="password">Password:</label>
//       <input
//         type="password"
//         id="password"
//         name="password"
//         value={form.password}
//         onChange={handleChange}
//       />

//       <button type="submit">Update Profile</button>
//     </form>
//   );
// };

// export default ProfileEdit;

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// const ProfileEdit = () => {
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const router = useRouter();
//   // const [errorMessage, setErrorMessage] = useState('');

//   // Function to fetch user data
//   const fetchUserData = async () => {
//     const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage
//     if (!userId) {
//       router.push('/login'); // Redirect to login if no userId is found
//       return;
//     }

//     try {
//       const res = await fetch(`/api/user/${userId}`);
//       if (!res.ok) {
//         throw new Error('Failed to fetch user data');
//       }
//       // return await res.json();
//       const userData = await res.json();
//       setForm(prevForm => ({
//         ...prevForm,
//         username: userData.username,
//         email: userData.email,
//       }));
//     } catch (error) {
//       console.error('Error during update:', error);
//       // setErrorMessage('Failed to update profile. Please try again.');
//       // res.status(500).json({ message: 'Error updating user', error: error.message });
//     }
//   };

//   // Fetch user data on component mount
//   // useEffect(() => {
//   //   fetchUserData().then(userData => {
//   //     if (userData) {
//   //       setForm(prevForm => ({
//   //         ...prevForm,
//   //         username: userData.username,
//   //         email: userData.email,
//   //       }));
//   //     }
//   //   });
//   // }, []);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

// // const handleSubmit = async (event) => {
// //   event.preventDefault();
// //   const userId = localStorage.getItem('userId');

// //   if (!userId) {
// //     console.error('No userId found in localStorage');
// //     return;
// //   }

// //   try {
// //     const response = await fetch(`/api/user/${userId}`, {
// //       method: 'PUT',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({
// //         username: form.username,
// //         email: form.email,
// //         password: form.password,
// //       }),
// //     });

// //     if (response.ok) {
// //       console.log('Profile updated successfully');
// //       router.push('/profile');
// //     } else {
// //       const errorResponse = await response.json();
// //       console.error('Failed to update profile:', errorResponse.message);
// //     }
// //   } catch (error) {
// //     console.error('Error during update:', error);
// //   }
// // };

// const handleSubmit = async (event) => {
//   event.preventDefault();
//   console.log('Form data:', form);

//   try {
//     const response = await fetch(`/api/user/update`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(form),
//     });

//     if (response.ok) {
//       console.log('Profile updated successfully');
//       router.push('/profile');
//     } else {
//       const errorResponse = await response.json();
//       console.error('Failed to update profile:', errorResponse.message);
//       // Here you might want to update the state to show the error message to the user
//     }
//   } catch (error) {
//     console.error('Error during update:', error);
//     // Here you might want to update the state to show the error message to the user
//   }
// };

//   const handleChange = event => {
//     const { name, value } = event.target;
//     setForm(prevForm => ({ ...prevForm, [name]: value }));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="username">Username:</label>
//       <input
//         type="text"
//         id="username"
//         name="username"
//         value={form.username}
//         onChange={handleChange}
//       />

//       <label htmlFor="email">Email:</label>
//       <input
//         type="email"
//         id="email"
//         name="email"
//         value={form.email}
//         onChange={handleChange}
//       />

//       <label htmlFor="password">Password:</label>
//       <input
//         type="password"
//         id="password"
//         name="password"
//         value={form.password}
//         onChange={handleChange}
//       />

//       <button type="submit">Update Profile</button>
//     </form>
//   );
// };

// export default ProfileEdit;

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// const ProfileEdit = () => {
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const router = useRouter();

//   // Function to fetch user data
//   const fetchUserData = async () => {
//     const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage
//     if (!userId) {
//       router.push('/login'); // Redirect to login if no userId is found
//       return;
//     }

//     try {
//       const response = await fetch(`/api/user/${userId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: form.username,
//           email: form.email,
//           password: form.password, // Only include this if you intend to update the password
//         }),
//       });

//       if (!res.ok) {
//         throw new Error('Failed to fetch user data');
//       }
//       return await res.json();
//     } catch (error) {
//       console.error('Error during update:', error);
//       res.status(500).json({ message: 'Error updating user', error: error.message });
//     }
//   };

//   // Fetch user data on component mount
//   useEffect(() => {
//     fetchUserData().then(userData => {
//       if (userData) {
//         setForm(prevForm => ({
//           ...prevForm,
//           username: userData.username,
//           email: userData.email,
//         }));
//       }
//     });
//   }, []);

//   const handleSubmit = async event => {
//     event.preventDefault();
//     console.log('Form data:', form);
//     const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage

//     // Make sure the userId is retrieved correctly
//   if (!userId) {
//     console.error('No userId found in localStorage');
//     return;
//   }

//     // Call your API to update the user profile
//     const response = await fetch(`/api/user/${userId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({userId, form}),
//     });

//     if (response.ok) {
//       // Handle success - perhaps redirect to the profile page or show a success message
//       router.push('/profile');
//     } else {
//       // Handle error - display error message to the user
//       const errorData = await response.json();
//       console.error('Failed to update profile', errorData);
//     }
//   };

//   const handleChange = event => {
//     const { name, value } = event.target;
//     setForm(prevForm => ({ ...prevForm, [name]: value }));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="username">Username:</label>
//       <input
//         type="text"
//         id="username"
//         name="username"
//         value={form.username}
//         onChange={handleChange}
//       />

//       <label htmlFor="email">Email:</label>
//       <input
//         type="email"
//         id="email"
//         name="email"
//         value={form.email}
//         onChange={handleChange}
//       />

//       <label htmlFor="password">Password:</label>
//       <input
//         type="password"
//         id="password"
//         name="password"
//         value={form.password}
//         onChange={handleChange}
//       />

//       <button type="submit">Update Profile</button>
//     </form>
//   );
// };

// export default ProfileEdit;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ProfileEdit = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  // Function to fetch user data
  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId"); // Retrieve the userId from localStorage
    if (!userId) {
      router.push("/login"); // Redirect to login if no userId is found
      return;
    }

    try {
      const response = await fetch(`/api/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData().then((userData) => {
      if (userData) {
        setForm((prevForm) => ({
          ...prevForm,
          username: userData.username,
          email: userData.email,
        }));
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }

    try {
      const response = await fetch(`/api/user/update`, {
        // Make sure this endpoint is correct
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

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
                    Edit Profile
                  </h2>
                </div>
              </div>

              <div className="container mx-auto pt-10 pb-5">
                <div className="w-full md:w-1/2 lg:w-2/3 mx-auto bg-white rounded-lg shadow">
                  <div className="py-4 px-8 text-black text-xl border-b border-gray-300">
                    <h3 className="text-3xl text-center font-bold my-4 underline">
                      Profile Details
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
                    {/* Username Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="username"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Username:
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="New Username.."
                        value={form.username}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="New Email.."
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Password:
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="New Password.."
                        value={form.password}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mt-6 focus:outline-none focus:shadow-outline"
                      >
                        UPDATE
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-6 focus:outline-none focus:shadow-outline"
                        onClick={() => router.push("/profile")}
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
    </main>
  );
};

export default ProfileEdit;
