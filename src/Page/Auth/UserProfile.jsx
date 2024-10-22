// components/UserProfile.jsx

import { Link, useNavigate } from "react-router-dom";
import useUser from "../../Security/useUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const [user, , refetch] = useUser();
  const navigate = useNavigate();

  if (!user) {
    return (
      <h1 className="text-center text-2xl py-3">
        No user data available. Please log in.{" "}
        <Link className="text-blue-500 ml-2 underline" to="/login">
          Login
        </Link>
      </h1>
    );
  }

  const handleLogout = async () => {
    try {
      const res = await axiosSecure("/api/logout");
      if (res.data) {
        navigate("/login");
        localStorage.removeItem("token");
        toast.success("Logout Successfully");
        window.location.reload();
        refetch();
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">User Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={user?.image || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4"
        />
        <h3 className="text-xl font-semibold">{user?.name}</h3>
        <p className="text-gray-600">{user?.role}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold">Contact Information</h4>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Mobile:</strong> {user?.mobile}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold">Address</h4>
        <p>{user?.address}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold">Gender</h4>
        <p>{user?.gender}</p>
      </div>

      <div className="flex justify-between mt-6">
        <Link to="/update-profile" className="btn btn-secondary">
          Update Profile
        </Link>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
