import React from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const TrainingandWorkshopAnnouncementList = () => {
  // Dummy data for training and workshop announcements
  const announcements = [
    {
      title: "Advanced React Workshop",
      dateTime: "2024-09-15 10:00 AM",
      venue: "Room 204, Tech Building",
      registrationDeadline: "2024-09-10",
    },
    {
      title: "Machine Learning Training",
      dateTime: "2024-09-20 2:00 PM",
      venue: "Conference Hall B",
      registrationDeadline: "2024-09-15",
    },
    {
      title: "Frontend Development Bootcamp",
      dateTime: "2024-09-25 9:00 AM",
      venue: "Online (Zoom)",
      registrationDeadline: "2024-09-20",
    },
    {
      title: "Frontend Development Bootcamp",
      dateTime: "2024-09-25 9:00 AM",
      venue: "Online (Zoom)",
      registrationDeadline: "2024-09-20",
    },
  ];

  return (
    <div className="gap-5 grid grid-cols-4 ">
      {announcements.map((announcement, index) => (
        <TrainingandWorkshopAnnouncementCard
          key={index}
          title={announcement.title}
          dateTime={announcement.dateTime}
          venue={announcement.venue}
          registrationDeadline={announcement.registrationDeadline}
        />
      ))}
    </div>
  );
};

export default TrainingandWorkshopAnnouncementList;

const TrainingandWorkshopAnnouncementCard = ({
  title,
  dateTime,
  venue,
  registrationDeadline,
}) => {
  return (
    <div className="block p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      {/* Title */}
      <h5 className="text-xl font-bold text-gray-900 mb-2">{title}</h5>

      {/* Date and Time */}
      <p className="text-gray-700 font-semibold mb-2">
        Date and Time: <span className="font-normal">{dateTime}</span>
      </p>

      {/* Venue */}
      <p className="text-gray-700 mb-2">Venue: {venue}</p>

      {/* Registration Deadline */}
      <p className="text-gray-700 mb-4">
        Registration Deadline: {registrationDeadline}
      </p>

      <div className="flex space-x-4">
        <button
          type="button"
          className="text-blue-500 hover:text-blue-700"
          aria-label="Edit"
        >
          <FiEdit size={24} />
        </button>
        <button
          type="button"
          className="text-red-500 hover:text-red-700"
          aria-label="Delete"
        >
          <AiOutlineDelete size={24} />
        </button>
      </div>
    </div>
  );
};
