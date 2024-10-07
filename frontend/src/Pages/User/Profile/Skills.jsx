import { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { FiEdit3 } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import Select from "react-select"; // Import react-select
import { skillOptions } from "./SkillsData";
import SkillImage from "../../../../public/images/skills.png";
import { Toast } from "../../../Components/Toast.jsx";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader.jsx";
import { putApi } from "../../../Utils/API.js";
import { SERVER_URL } from "../../../Utils/URLPath.jsx";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    maxHeight: "600px",
    overflowY: "auto",
    padding: "20px",
  },
};

if (window.innerWidth < 768) {
  customStyles.content.width = "90%";
}

export const Skills = ({ studentData }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...studentData,
    },
  });

  // Open the modal
  const openModal = () => {
    reset(studentData);
    setIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      skills: selectedSkills, // Include selectedSkills in the payload
    };



    try {
      const response = await putApi(payload, `${SERVER_URL}/api/updateskills`);
      if (response.statusCode === 200) {
        setLoading(false);
        toast.success("Student Data Updated Successfully");
        closeModal();
      } else {
        alert("Failed to update student data. Please try again.");
      }
    } catch (error) {
      // setLoading(false);
      console.error("Error updating student data:", error);
      alert("An error occurred while updating the student data.");
    }
  };

  // Handle skills selection with a maximum of 10 skills
  const handleSkillChange = (selectedOptions) => {
    if (selectedOptions.length <= 7) {
      setSelectedSkills(selectedOptions.map((option) => option.label));
    } else {
      // alert("You can only select up to 10 skills");
      toast.info("Maximum. 7 Skills Only ");
    }
  };

  return (
    <>
      <Toast />
      <h3 className="font-serif w-full font-bold text-lg text-gray-800 flex-shrink-0 pr-4 py-4">
        <div className="flex w-full justify-between gap-3 items-center">
          <div className="flex gap-5 items-center">
            <img src={SkillImage} alt="" className="h-12 w-12" /> Skills
          </div>
          <FiEdit3
            size={25}
            className="cursor-pointer hover:text-gray-600"
            onClick={openModal}
          />
        </div>
      </h3>

      <div className="flex-grow border-t border-gray-300 mb-4"></div>

      <div>
        {studentData.skills.map((skill, index) => (
          <button
            key={index}
            className="text-green-700 border border-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500  "
          >
            {skill}
          </button>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Skills Modal"
        ariaHideApp={false}
      >
        <div className="flex justify-between">
          <h2 className="flex font-serif font-bold text-xl mb-10">
            Edit Skills
          </h2>
          <RxCross1 size={30} onClick={closeModal} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="font-serif">
          <div className="mb-6">
            <label htmlFor="skills" className="block mb-2">
              Select Skills (Max 7):
            </label>
            <Select
              isMulti
              name="skills"
              options={skillOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSkillChange}
              value={skillOptions.filter((option) =>
                selectedSkills.includes(option.label)
              )}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="selectedSkills" className="block mb-2">
              Selected Skills:
            </label>
            <input
              type="text"
              id="selectedSkills"
              value={selectedSkills.join(", ")}
              readOnly
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="flex items-center mt-10 gap-10">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
