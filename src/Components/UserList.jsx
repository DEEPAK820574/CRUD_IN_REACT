import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api/api";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteSweep } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const UserList = () => {
  // State to store the list of users, loading state, and any error that occurs
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch users from the API when the component mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers(); // Fetch users from the API
        setUsers(response.data); // Update state with fetched users
      } catch (err) {
        setError("Failed to fetch users."); // Set error message if fetch fails
      } finally {
        setLoading(false); // Set loading to false after data fetch or error
      }
    };

    loadUsers(); // Call the function to fetch users
  }, []); // Empty dependency array ensures this runs only on mount

  // Function to handle deletion of a user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id); // Call API to delete the user
      setUsers(users.filter((user) => user.id !== id)); // Update state to remove deleted user
      const deleted_user = users.find((user) => user.id === id); // Find the deleted user for success message
      if (deleted_user) {
        toast.success(`${deleted_user.name} deleted successfully!`); // Show success message
      }
    } catch (err) {
      setError("Failed to delete user."); // Set error message if deletion fails
    }
  };

  // Display loading state while fetching data
  if (loading) return <p>Loading...</p>;

  // Display error message if there's an error
  if (error) return <p>Error: {error}</p>;

  // Render the list of users with delete and update functionality
  return (
    <div className="flex flex-col items-center text-center gap-y-4 p-4">
      <h1 className="text-white text-4xl sm:text-6xl font-semibold mt-4">Users</h1>
      <Link to="/create" className="text-lg sm:text-xl text-blue-700 mb-4">
        Create User
      </Link>
      <ul className="w-full max-w-4xl flex flex-col gap-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="text-sm sm:text-md text-white flex flex-col sm:flex-row justify-between items-center pl-2 p-0 "
          >
            <div className="flex flex-col  justify-between  pl-2 p-2 sm:flex-row w-full gap-y-2 sm:gap-x-4 items-start sm:items-center border border-zinc-200 rounded-md">
              <span className="w-full sm:w-1/4 text-left">{user.name}</span>
              <span className="w-full sm:w-1/4 text-left">{user.email}</span>
              <span className="w-full sm:w-1/4 text-left">{user.phone}</span>
            </div>
            <div className="flex gap-x-2 mt-2  ml-2 sm:mt-0">
              {/* Button to delete user */}
              <button
                onClick={() => handleDelete(user.id)}
                className="p-2 bg-red-400 rounded-md"
                aria-label={`Delete ${user.name}`}
              >
                <MdDeleteSweep className="w-6 h-6" />
              </button>
              {/* Link to update user details */}
              <Link
                to={`/users/${user.id}`}
                className="p-2 bg-purple-500 rounded-md"
                aria-label={`Edit ${user.name}`}
              >
                <RxUpdate className="w-6 h-6" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default UserList;
