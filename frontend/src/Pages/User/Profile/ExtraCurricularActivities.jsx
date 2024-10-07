import { GiMusicalScore } from "react-icons/gi";

import { SERVER_URL } from "../../../Utils/URLPath";
import SkillImage from "../../../../public/images/skills.png";
import { FiEdit3 } from "react-icons/fi";
import { LuSchool } from "react-icons/lu";
import { BsPersonWorkspace } from "react-icons/bs";

import { GiDiploma } from "react-icons/gi";
import { FaGraduationCap } from "react-icons/fa6";

import { GrContactInfo } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import Modal from "react-modal";
import { GrProjects } from "react-icons/gr";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export const ExtraCurricularActivities = ({ studentData }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...studentData,
    },
  });

  // Open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Handle form submission
  const onSubmit = (data) => {
 
    // Here you would typically send the updated data to the server
    closeModal();
  };

  return (
    <>
      <h3 className="font-serif w-full font-bold text-lg text-gray-800 flex-shrink-0 pr-4 py-4">
        <div className="flex w-full justify-between gap-3 items-center">
          <div className="flex gap-5 items-center">
            <GiMusicalScore size={30} />
            Extra Curricular Activities
          </div>
          <FiEdit3
            size={25}
            className="cursor-pointer hover:text-gray-600"
            onClick={openModal}
          />
        </div>
      </h3>
      <div className="flex-grow border-t border-gray-300 mb-4"></div>{" "}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Basic Details Modal"
        ariaHideApp={false}
      >
        <div className="flex justify-between">
          <h2 className="flex font-serif font-bold text-xl mb-10">
            Edit Basic Details
          </h2>
          <RxCross1 size={30} onClick={closeModal} /> {/* Updated here */}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="font-serif">
          <div className="grid grid-cols-2 gap-4 h-96 overflow-y-scroll">
            <label>
              Roll No:
              <input
                type="text"
                {...register("student_roll_no")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Date of Birth:
              <input
                type="date"
                {...register("date_of_birth")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Campus:
              <input
                type="text"
                {...register("campus")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Program:
              <input
                type="text"
                {...register("program")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Gender:
              <input
                type="text"
                {...register("gender")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Father's Name:
              <input
                type="text"
                {...register("fathers_name")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Mother's Name:
              <input
                type="text"
                {...register("mothers_name")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Student Mobile No:
              <input
                type="tel"
                {...register("student_mobile_no")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Father Mobile No:
              <input
                type="tel"
                {...register("fathers_mobile_no")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Mother Mobile No:
              <input
                type="tel"
                {...register("mothers_mobile_no")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Email ID:
              <input
                type="email"
                {...register("student_email_id")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Alternate Email ID:
              <input
                type="email"
                {...register("student_alternate_email_id")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Local Address:
              <input
                type="text"
                {...register("local_address")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Local Address City:
              <input
                type="text"
                {...register("local_address_city")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Local Address State:
              <input
                type="text"
                {...register("local_address_state")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Permanent Address:
              <input
                type="text"
                {...register("permanent_address")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Permanent Address City:
              <input
                type="text"
                {...register("permanent_address_city")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Permanent Address State:
              <input
                type="text"
                {...register("permanent_address_state")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Permanent Address Country:
              <input
                type="text"
                {...register("permanent_address_country")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Postal Code:
              <input
                type="text"
                {...register("permanent_address_postal_code")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Aadhar Card No:
              <input
                type="text"
                {...register("aadhar_card_no")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              PAN Card:
              <input
                type="text"
                {...register("pan_card_no")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Passport No:
              <input
                type="text"
                {...register("passport_no")}
                className="border rounded p-2 w-full"
              />
            </label>

            <label>
              Passport Expiry Date:
              <input
                type="date"
                {...register("passport_expiry_date")}
                className="border rounded p-2 w-full"
              />
            </label>
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
