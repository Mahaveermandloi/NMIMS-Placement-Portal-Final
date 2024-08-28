import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApi } from "../../../Utils/API.js";
import { SERVER_URL, ADMIN_PATH } from "../../../Utils/URLPath.jsx";
import Loader from "../../../Components/Loader.jsx";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("N/A");
  const [email, setEmail] = useState("N/A");
  const [adminID, setAdminID] = useState("N/A");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await getApi("/api/admin/get-admin-details");
        console.log(response.data);
        if (response.data) {
          setName(response.data.name || "N/A");
          setEmail(response.data.email || "N/A");
          setAdminID(response.data.adminID || "N/A");
          setProfileImage(response.data.profile_image || "");
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  if (loading) {
    return <Loader message={"Loading..."} />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            {/* <img
              src={
                profileImage
                  ? `${SERVER_URL}${profileImage}`
                  : "https://i.imgur.com/gE97qYj.jpg"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            /> */}
            <img
              src="https://media.licdn.com/dms/image/C4D03AQGHME97R94JlQ/profile-displayphoto-shrink_200_200/0/1661392392680?e=2147483647&v=beta&t=ba2v62QjNbgX8DTPxr8l7WTeUnx195a_NVUb8fqBm4k"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold mb-1">{name}</h2>
          <p className="text-gray-600">ADMIN ID: {adminID}</p>
          <p className="text-gray-600">Email: {email}</p>
        </div>
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          <button
            onClick={() => navigate(`${ADMIN_PATH}/update-profile`)}
            className="bg-blue-500 text-white py-2 px-4 w-full lg:w-1/2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update Profile
          </button>
          <button
            onClick={() => navigate(`${ADMIN_PATH}/change-password`)}
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
