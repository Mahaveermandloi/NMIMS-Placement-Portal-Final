import React, { useEffect, useState } from "react";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import { useNavigate } from "react-router-dom";
import { getApi, deleteApi } from "../../../Utils/API.js";
import Loader from "../../../Components/Loader.jsx";
import nodata from "../../../../public/images/no-data.png";
import { Toast } from "../../../Components/Toast.jsx";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { IoAddCircleOutline } from "react-icons/io5";

const Announcements = () => {
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await getApi(`/api/announcement`);
        if (response.statusCode === 200) {
          setAnnouncements(response.data);
        }
      } catch (err) {
        setError("Failed to fetch announcements.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <>
      {loading ? (
        <Loader message="Loading..." />
      ) : (
        <>
          <Toast />
          <div className=" ">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className=" text-2xl lg:text-3xl font-bold">
                  Announcements
                </h1>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => navigate(`${ADMIN_PATH}/add-announcements`)}
                  className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm lg:px-5 px-2.5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  {/* Show only "Add Announcement" on desktop */}
                  <span className="hidden md:inline">Add Announcement</span>

                  {/* Show the plus icon on mobile */}
                  <IoAddCircleOutline size={25} className="inline md:hidden" />
                </button>
              </div>
            </div>

            <div>
              {error ? (
                <div className="text-red-500">{error}</div>
              ) : announcements.length > 0 ? (
                <CompanyVisitAnnouncementList
                  announcements={announcements}
                  setAnnouncements={setAnnouncements}
                />
              ) : (
                <div className="text-center">
                  <img src={nodata} alt="No data" className="mx-auto" />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Announcements;

const CompanyVisitAnnouncementList = ({ announcements, setAnnouncements }) => {
  return (
    <div className=" grid lg:grid-cols-4 gap-5">
      {announcements.map((announcement) => (
        <CompanyVisitAnnouncementCard
          key={announcement._id}
          announcement={announcement}
          setAnnouncements={setAnnouncements}
        />
      ))}
    </div>
  );
};

const CompanyVisitAnnouncementCard = ({ announcement, setAnnouncements }) => {
  const { company_name, company_logo, roles_offered, date, _id } = announcement;

  const navigate = useNavigate();

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // or return `${year}-${month}-${day}` for a different format
  };

  const handleDelete = async (id) => {
    let isConfirmed = false;

    const confirmDeletion = () => {
      isConfirmed = true;
      toast.dismiss(confirmationToastId);
    };

    const confirmationToastId = toast.info(
      <div>
        <p>Are you sure you want to delete this announcement?</p>
        <div className="flex justify-end mt-3">
          <button
            onClick={confirmDeletion}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(confirmationToastId)}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm ml-2"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-center",
      }
    );

    while (!isConfirmed) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (isConfirmed) {
      try {
        const response = await deleteApi(
          `${SERVER_URL}/api/announcement/${id}`
        );
        if (response.statusCode === 200) {
          toast.success("Announcement deleted successfully!");
          setAnnouncements((prev) =>
            prev.filter((announcement) => announcement._id !== id)
          );
        } else {
          toast.error("Failed to delete announcement.");
        }
      } catch (error) {
        console.error("Failed to delete announcement:", error);
        toast.error("An error occurred while deleting the announcement.");
      }
    }
  };

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      <div className="flex gap-5">
        <img
          src={`${SERVER_URL}${company_logo}`}
          alt={`${company_name} Logo`}
          className="mb-4 w-16 h-16 object-cover rounded-full"
        />
        <h5 className="mb-2 text-xl text-gray-900 font-bold">{company_name}</h5>
      </div>
      <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
        Roles Offered: {roles_offered}
      </p>
      <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
        Date: {formatDate(date)}
      </p>
      <div className="flex space-x-4">
        <button
          type="button"
          className="text-blue-500 hover:text-blue-700"
          aria-label="Edit"
          onClick={() => navigate(`${ADMIN_PATH}/update-announcement/${_id}`)}
        >
          <FiEdit size={24} />
        </button>
        <button
          type="button"
          className="text-red-500 hover:text-red-700"
          aria-label="Delete"
          onClick={() => handleDelete(_id)}
        >
          <AiOutlineDelete size={24} />
        </button>
      </div>
    </div>
  );
};
