import React, { useState, useEffect } from "react";
import Loader from "../../../Components/Loader";
import { Toast } from "../../../Components/Toast";
import { getApi } from "../../../Utils/API";
import { SERVER_URL } from "../../../Utils/URLPath";
import { RxCross1 } from "react-icons/rx";
import { putApi } from "../../../Utils/API";

const Notifications = () => {
  const [announcements, setAnnouncements] = useState([]); // Initialized useState as an empty array
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state for better error handling

  useEffect(() => {
    const getAnnouncements = async () => {
      const SAPID = localStorage.getItem("SAPID");

      try {
        const response = await getApi("/api/announcement");
      

        if (response.statusCode === 200) {
          if (response.data.length > 0) {
            // Sort the announcements by date in descending order
            const sortedAnnouncements = response.data.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );

            setAnnouncements(sortedAnnouncements);

            // Prepare the announcement IDs where SAPID is not in the status array
            const announcementIds = sortedAnnouncements
              .filter((announcement) => !announcement.status.includes(SAPID))
              .map((announcement) => announcement._id);

            // Call the function to mark these announcements as read
            readAnnouncement(announcementIds);
          } else {
            setAnnouncements([]);
          }
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setError("Failed to fetch announcements");
      } finally {
        setLoading(false);
      }
    };

    const readAnnouncement = async (announcementIds) => {
      const SAPID = localStorage.getItem("SAPID");
      const payload = {
        announcementIds: announcementIds, // Include the filtered announcement IDs
        student_sap_no: SAPID, // Send SAPID in the payload as student_sap_no
      };

      try {
        const response = await putApi(payload, "/api/announcement");
        if (response.statusCode === 200) {
          // Optionally update the announcements based on the response after marking them as read
          if (response.data.length > 0) {
            setAnnouncements(response.data);
          } else {
            setAnnouncements([]);
          }
        }
      } catch (error) {
        console.error("Error reading announcements:", error);
      }
    };

    getAnnouncements();
  }, []);

  if (loading) {
    return <Loader />; // Show loader while loading
  }

  if (error) {
    return <p>{error}</p>; // Display error if any
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>

      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <NotificationCard
            key={announcement._id}
            company_logo={announcement.company_logo}
            company_name={announcement.company_name}
            date={announcement.date}
            roles_offered={announcement.roles_offered}
            status={announcement.status}
          />
        ))
      ) : (
        <p>No announcements available.</p>
      )}
    </div>
  );
};

export default Notifications;

const NotificationCard = ({
  company_logo,
  company_name,
  date,
  roles_offered,
  status,
}) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:shadow-2xl duration-300 ease-in-out">
      {/* Close Icon */}
      <RxCross1
        className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-red-500"
        size={20}
      />

      {/* Company Logo and Name */}
      <div className="flex items-center">
        <img
          src={`${company_logo}`}
          alt={`${company_name} logo`}
          className="w-14 h-14 rounded-full shadow-md object-cover mr-4"
        />
        <h3 className="text-xl font-semibold text-gray-800">{company_name}</h3>
      </div>

      {/* Announcement Details */}
      <div className="text-gray-700">
        <p className="mb-2">
          <span className="font-bold">Date:</span>{" "}
          {new Date(date).toLocaleDateString()}
        </p>
        <p className="mb-2">
          <span className="font-bold">Role:</span> {roles_offered}
        </p>
      </div>
    </div>
  );
};
