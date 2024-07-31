import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Avatar from "../../images/download.jpeg";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("userDetails");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData?.user_data?.length) {
          setUserData(parsedData.user_data[0]);
        } else {
          console.log("No user data available");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userDetails");
        Swal.fire(
          "Logged out!",
          "Your account has been logged out.",
          "success"
        );
        navigate("/signin");
      }
    });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-md md:max-w-4xl w-full">
        <div className="flex items-center mb-6">
          <img
            src={Avatar}
            alt="Profile"
            className="rounded-full h-20 w-20 border-2 border-indigo-600"
          />
          <div className="ml-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              {userData.user_firstname} {userData.user_lastname}
            </h2>
            <p className="text-gray-600">{userData.user_email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "First Name", value: userData.user_firstname },
            { label: "Last Name", value: userData.user_lastname },
            { label: "Email", value: userData.user_email },
            { label: "Mobile", value: userData.user_phone },
            { label: "City", value: userData.user_city },
            { label: "Zipcode", value: userData.user_zipcode },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition duration-200"
            >
              <span className="font-medium text-gray-700">{item.label}</span>
              <span className="text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
