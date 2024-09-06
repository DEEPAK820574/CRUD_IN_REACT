import React, { useState, useEffect } from "react";
import { createUser, updateUser, fetchUser } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserForm = ({ isEdit }) => {
  // Extract user ID from URL parameters
  const { id } = useParams();
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // State to manage user form data
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // State to manage error messages
  const [error, setError] = useState(null);

  // Effect to fetch user data for editing when component mounts or ID changes
  useEffect(() => {
    if (isEdit && id) {
      const loadUser = async () => {
        try {
          // Fetch user data from API
          const response = await fetchUser(id);
          setUser(response.data); // Populate form with fetched user data
        } catch (err) {
          // Handle fetch error
          setError("Failed to fetch user.");
          toast.error("Failed to fetch user.");
        }
      };

      loadUser();
    }
  }, [isEdit, id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission for creating or updating a user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        // Update existing user
        await updateUser(id, user);
        toast.success(`${user.name} updated successfully!`);
      } else {
        // Create new user
        await createUser(user);
        toast.success(`${user.name} created successfully!`);
      }

      // Delay navigation to ensure toast notification is visible
      setTimeout(() => {
        navigate("/"); // Redirect to home page after submission
      }, 2000); // Adjust delay to match toast display duration
    } catch (err) {
      // Handle form submission error
      setError(isEdit ? "Failed to update user." : "Failed to create user.");
      toast.error(isEdit ? "Failed to update user." : "Failed to create user.");
    }
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      {/* Link to navigate back to home */}
      <Link to="/" className="text-xl text-blue-700 mb-10">Home</Link>

      <div className="flex flex-col justify-center text-center space-y-4 border border-white rounded-lg p-10 shadow-custom-light">
        {/* Form title based on edit or create mode */}
        <h1 className="text-white text-6xl font-semibold">{isEdit ? "Edit User" : "Create User"}</h1>
        
        {/* User form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="text-center pr-2 text-xl text-slate-100">Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            className="rounded w-[65%] p-1  bg-slate-300"
          />
          <br />
          <label className="text-center pr-2 text-xl text-slate-100">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className="rounded w-[65%] p-1  bg-slate-300"
          />
          <br />
          <label className="text-center pr-2 text-xl text-slate-100">Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
            className="rounded w-[65%] p-1 bg-slate-300"
          />
          <br />
          <button type="submit" className="px-6 py-2 bg-green-500 rounded-md  text-white font-semibold">Submit</button>
        </form>
        {/* Toast container for displaying notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserForm;
