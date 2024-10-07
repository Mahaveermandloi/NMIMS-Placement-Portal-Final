import { SERVER_URL } from "../../../Utils/URLPath";

import { TbListDetails } from "react-icons/tb";

import { FaGraduationCap } from "react-icons/fa6";

import { FiEdit3 } from "react-icons/fi";
import { GrContactInfo } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import Modal from "react-modal";

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
export const AdditionalDetails = ({ studentData }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
      <div className="mb-16">
        <h3 className="font-serif w-full font-bold text-lg text-gray-800 flex-shrink-0 pr-4 py-4">
          <div className="flex w-full justify-between gap-3 items-center">
            <div className="flex gap-5 items-center">
              <TbListDetails size={30} />
              Additional
            </div>
            {/* <FiEdit3
              size={25}
              className="cursor-pointer hover:text-gray-600"
              onClick={openModal}
            /> */}
          </div>
        </h3>
        <div className="flex-grow border-t border-gray-300 mb-4"></div>

        <div className="flex flex-col font-serif text-[16px] gap-2">
          <div className="flex justify-between">
            <p
              className={`${
                studentData.total_dead_kts > 0
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              Total Dead KTs:
            </p>

            <p>{studentData.total_dead_kts}</p>
          </div>

          <div className="flex justify-between">
            <p
              className={`${
                studentData.total_live_kts > 0
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              Total Live KTs:
            </p>
            <p>{studentData.total_live_kts}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Last Received Marksheet:</p>
            <p>{studentData.last_received_marksheet || "N/A"}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Has Year Drop or Gap:</p>
            <p>{studentData.has_year_drop_or_gap}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">
              Year Drop Between Tenth and Beginning of Engineering:
            </p>
            <p>
              {studentData.year_drop_between_tenth_and_beginning_of_engineering ||
                "N/A"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Years of Gap:</p>
            <p>{studentData.years_of_gap || "N/A"}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">
              Reason for Gap or Drop Before Engineering:
            </p>
            <p>
              {studentData.reason_for_gap_or_drop_before_engineering || "N/A"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Year Drop Between Engineering:</p>
            <p>{studentData.year_drop_between_engineering || "N/A"}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Years of Gap During Engineering:</p>
            <p>{studentData.years_of_gap_during_engineering || "N/A"}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">
              Reason for Gap or Drop During Engineering:
            </p>
            <p>
              {studentData.reason_for_gap_or_drop_during_engineering || "N/A"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">CV Uploaded in NMIMS Format:</p>
            <p>{studentData.cv_uploaded_in_nmims_format || "N/A"}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Documents Uploaded:</p>
            <p>{studentData.documents_uploaded || "N/A"}</p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Basic Details Modal"
        ariaHideApp={false}
      >
        <div className="flex justify-between">
          <h2 className="flex font-serif font-bold text-xl mb-10">
            Additional Details
          </h2>
          <RxCross1 size={30} onClick={closeModal} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="font-serif">
          <div className="grid lg:grid-cols-2 gap-4 h-96 overflow-y-scroll">
            <label>
              Roll No:
              <input
                type="text"
                {...register("student_roll_no", {
                  required: "Roll No is required",
                })}
                className="border rounded p-2 w-full"
              />
              {errors.student_roll_no && (
                <p className="text-red-500">{errors.student_roll_no.message}</p>
              )}
            </label>

            <label>
              Date of Birth:
              <input
                type="date"
                {...register("date_of_birth", {
                  required: "Date of Birth is required",
                })}
                className="border rounded p-2 w-full"
              />
              {errors.date_of_birth && (
                <p className="text-red-500">{errors.date_of_birth.message}</p>
              )}
            </label>

            <label>
              Campus:
              <input
                type="text"
                {...register("campus", { required: "Campus is required" })}
                className="border rounded p-2 w-full"
              />
              {errors.campus && (
                <p className="text-red-500">{errors.campus.message}</p>
              )}
            </label>

            <label>
              Program:
              <input
                type="text"
                {...register("program", { required: "Program is required" })}
                className="border rounded p-2 w-full"
              />
              {errors.program && (
                <p className="text-red-500">{errors.program.message}</p>
              )}
            </label>

            <label>
              Gender:
              <input
                type="text"
                {...register("gender", { required: "Gender is required" })}
                className="border rounded p-2 w-full"
              />
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </label>

            <label>
              Father's Name:
              <input
                type="text"
                {...register("fathers_name", {
                  required: "Father's Name is required",
                })}
                className="border rounded p-2 w-full"
              />
              {errors.fathers_name && (
                <p className="text-red-500">{errors.fathers_name.message}</p>
              )}
            </label>

            <label>
              Mother's Name:
              <input
                type="text"
                {...register("mothers_name", {
                  required: "Mother's Name is required",
                })}
                className="border rounded p-2 w-full"
              />
              {errors.mothers_name && (
                <p className="text-red-500">{errors.mothers_name.message}</p>
              )}
            </label>

            <label>
              Student Mobile No:
              <input
                type="tel"
                {...register("student_mobile_no", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                })}
                className="border rounded p-2 w-full"
              />
              {errors.student_mobile_no && (
                <p className="text-red-500">
                  {errors.student_mobile_no.message}
                </p>
              )}
            </label>

            <label>
              Father Mobile No:
              <input
                type="tel"
                {...register("fathers_mobile_no", {
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                })}
                className="border rounded p-2 w-full"
              />
              {errors.fathers_mobile_no && (
                <p className="text-red-500">
                  {errors.fathers_mobile_no.message}
                </p>
              )}
            </label>

            <label>
              Mother Mobile No:
              <input
                type="tel"
                {...register("mothers_mobile_no", {
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                })}
                className="border rounded p-2 w-full"
              />
              {errors.mothers_mobile_no && (
                <p className="text-red-500">
                  {errors.mothers_mobile_no.message}
                </p>
              )}
            </label>

            <label>
              Email ID:
              <input
                type="email"
                {...register("student_email_id", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email",
                  },
                })}
                className="border rounded p-2 w-full"
              />
              {errors.student_email_id && (
                <p className="text-red-500">
                  {errors.student_email_id.message}
                </p>
              )}
            </label>

            <label>
              Alternate Email ID:
              <input
                type="email"
                {...register("student_alternate_email_id", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email",
                  },
                })}
                className="border rounded p-2 w-full"
              />
              {errors.student_alternate_email_id && (
                <p className="text-red-500">
                  {errors.student_alternate_email_id.message}
                </p>
              )}
            </label>

            <label>
              Aadhar Card No:
              <input
                type="text"
                {...register("aadhar_card_no", {
                  pattern: {
                    value: /^[0-9]{12}$/,
                    message: "Enter a valid 12-digit Aadhar number",
                  },
                })}
                className="border rounded p-2 w-full"
              />
              {errors.aadhar_card_no && (
                <p className="text-red-500">{errors.aadhar_card_no.message}</p>
              )}
            </label>

            <label>
              PAN Card:
              <input
                type="text"
                {...register("pan_card_no", {
                  pattern: {
                    value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                    message: "Enter a valid PAN card number",
                  },
                })}
                className="border rounded p-2 w-full"
              />
              {errors.pan_card_no && (
                <p className="text-red-500">{errors.pan_card_no.message}</p>
              )}
            </label>

            <label>
              Passport No:
              <input
                type="text"
                {...register("passport_no", {
                  pattern: {
                    value: /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/,
                    message: "Enter a valid passport number",
                  },
                })}
                className="border rounded p-2 w-full"
              />
              {errors.passport_no && (
                <p className="text-red-500">{errors.passport_no.message}</p>
              )}
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
