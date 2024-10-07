import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../../Utils/URLPath.jsx";
import { deleteApi } from "../../../../Utils/API.js";

const PlacedStudentCard = ({ student }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    let isConfirmed = false;

    const confirmDeletion = () => {
      isConfirmed = true;
      toast.dismiss(confirmationToastId);
    };

    const confirmationToastId = toast.info(
      <div>
        <p>Are you sure you want to delete this placement?</p>
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
        const response = await deleteApi(`/api/placedstudents/${student._id}`);

        if (response.statusCode === 200) {
          toast.success("Placement deleted successfully!");
          window.location.reload();
        } else {
          toast.error("Failed to delete placement.");
        }
      } catch (error) {
        console.error("Error deleting placement:", error);
        toast.error("An error occurred while deleting the placement.");
      }
    }
  };

  return (
    <div className="relative max-w-sm bg-white hover:shadow-xl rounded-lg shadow-lg flex flex-col">
      <div className="absolute top-2 right-2 flex gap-2">
        <FiEdit
          style={{ cursor: "pointer", fontSize: "24px", color: "#3f51b5" }}
          onClick={() =>
            navigate(`/nmims/admin/edit-placed-student/${student._id}`)
          }
        />
        <AiOutlineDelete
          style={{ cursor: "pointer", fontSize: "26px", color: "#f44336" }}
          onClick={handleDelete}
        />
      </div>

      <div className="flex items-center p-4">
        <div className="w-24 h-24 flex-shrink-0 mr-4">
          <img
            className="w-full h-full   rounded-full shadow-lg"
            src={`${student.student_profile_image}`}
            alt="Profile"
          />
        
        </div>
        <div className="flex-1">
          <h5 className="text-lg font-medium text-gray-900">
            {student.name_of_student}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {student.job_title}
          </span>
          <br />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {student.ctc} LPA <span>|</span>{" "}
            <span className="text-gray-600">{student.year}</span>
          </span>
          <br />
          <div className="mt-2">
            <img
              src={`${student.company_logo}`}
              alt="Company Logo"
              className="w-20 h-10 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacedStudentCard;
