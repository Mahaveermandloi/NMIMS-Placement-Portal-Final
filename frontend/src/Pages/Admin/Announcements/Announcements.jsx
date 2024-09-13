import React, { useEffect, useState } from "react";
import CompanyCard from "../Companies/Components/CompanyCard.jsx";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import { useNavigate } from "react-router-dom";
import { getApi } from "../../../Utils/API.js";
import Loader from "../../../Components/Loader.jsx";
import nodata from "../../../../public/images/no-data.png";
import { Toast } from "../../../Components/Toast.jsx";
import CompanyVisitAnnouncementList from "./Lists/CompanyVisitAnnouncementList.jsx";
import TrainingandWorkshopAnnouncementList from "./Lists/TrainingandWorkshopAnnouncementList.jsx";
const Announcements = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("company-visit");

  const renderTabContent = () => {
    switch (activeTab) {
      case "company-visit":
        return <CompanyVisitAnnouncementList />;
      case "training-workshop":
        return <TrainingandWorkshopAnnouncementList />;

      default:
        return null;
    }
  };

  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <Loader message="Loading..." />
      ) : (
        <>
          <Toast />
          <div className="flex  justify-between  items-center mb-4">
            <h1 className="text-3xl font-bold">Announcements</h1>
            <button
              type="button"
              onClick={() => navigate(`${ADMIN_PATH}/add-announcement`)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Announcement
            </button>
          </div>

          <div className="">
            <div className="mb-4">
              <div className="flex  border-b">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "company-visit"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("company-visit")}
                >
                  Company Visit Announcement
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "training-workshop"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("training-workshop")}
                >
                  Training and Workshop Announcement
                </button>
              </div>
            </div>

            <div className="mt-2  ">{renderTabContent()}</div>
          </div>
        </>
      )}
    </>
  );
};

export default Announcements;
