import React from "react";
import { ADMIN_PATH, STUDENT_PATH } from "../../../Utils/URLPath";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img
              src="https://i.imgur.com/gE97qYj.jpg" // Replace with actual image URL or variable
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold mb-1">Mahaveer Mandloi</h2>
          <p className="text-gray-600">SAP ID: 70552100091</p>

          <p className="text-gray-600">Email: mahaveermandloi9@gmail.com</p>
          <p className="text-gray-600">
            College Mail: mahaveer.mandloi091@nmims.edu
          </p>
          <p className="text-gray-600">
            Mobile No: +919753315419
          </p>
        </div>

        <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          <button
            onClick={() => navigate(`${STUDENT_PATH}/update-profile`)}
            className="bg-blue-500 text-white py-2 px-4 w-full lg:w-1/2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update Profile
          </button>
          <button
            onClick={() => navigate(`${STUDENT_PATH}/change-password`)}
            className="bg-red-500 text-white py-2 px-4 w-full lg:w-1/2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
