import React, { useState } from "react";
import Modal from "react-modal";
import { FiEdit3 } from "react-icons/fi";
import { GrContactInfo } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { putApi } from "../../../Utils/API.js";
import Loader from "../../../Components/Loader.jsx";
import { Toast } from "../../../Components/Toast.jsx";
import { SERVER_URL } from "../../../Utils/URLPath.jsx";
import { states } from "../../../Components/States.jsx";

import { toast } from "react-toastify";
//  Modal styles
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

export const BasicDetails = ({ studentData }) => {
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

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

  //  Open the modal
  const openModal = () => {
    reset(studentData); // Reset the form with current student data
    setIsOpen(true); // Open the modal
  };

  //  Close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    const payload = { ...data, student_sap_no: studentData.student_sap_no };

    setLoading(true);

    try {
      const response = await putApi(
        payload,
        `${SERVER_URL}/api/updatebasicdetails`
      );
      if (response.statusCode === 200) {
        setLoading(false);

        toast.success("Student Data Updated Successfully");
        closeModal();
      } else {
        alert("Failed to update student data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating student data:", error);
      alert("An error occurred while updating the student data.");
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Toast />
          <Loader />
        </>
      ) : (
        <>
          <Toast />
          <div className="font-serif">
            <div className="flex font-serif items-center my-4">
              <h3 className="font-serif w-full font-bold text-lg text-gray-800 flex-shrink-0 pr-4">
                <div className="flex w-full justify-between gap-3 items-center">
                  <div className="flex gap-5 items-center">
                    <GrContactInfo size={30} />
                    Basic Details
                  </div>
                  <FiEdit3
                    size={25}
                    className="cursor-pointer hover:text-gray-600"
                    onClick={openModal}
                  />
                </div>
              </h3>
            </div>
            <div className="flex-grow border-t border-gray-300 mb-4"></div>

            {/* Display Basic Details */}
            <div className="lg:px-0 px-5 flex flex-col justify-around font-serif text-[16px] gap-5">
              <div className="flex justify-between">
                <p className="text-gray-400">Roll No:</p>
                <p>{studentData.student_roll_no}</p>
              </div>
              {/* Additional details omitted for brevity */}

              <div className="flex justify-between">
                <p className="text-gray-400">Date of Birth:</p>
                <p>
                  {new Date(studentData.date_of_birth).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Campus:</p>
                <p>
                  {studentData.campus === "shirpur" ? "Shirpur" : "Shirpur"}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Program:</p>
                <p>{studentData.program}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Gender:</p>
                <p>{studentData.gender}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Father's Name:</p>
                <p>{studentData.fathers_name}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Mother's Name:</p>
                <p>{studentData.mothers_name}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Student Mobile No:</p>
                <p>{studentData.student_mobile_no}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Father Mobile No:</p>
                <p>{studentData.fathers_mobile_no}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Mother Mobile No:</p>
                <p>
                  {studentData.mothers_mobile_no
                    ? studentData.mothers_mobile_no
                    : "N/A"}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Email ID:</p>
                <p>{studentData.student_email_id}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Alternate Email ID:</p>
                <p>{studentData.student_alternate_email_id || "N/A"}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Local Address:</p>
                <p>
                  {studentData.local_address}, {studentData.local_address_city},{" "}
                  {studentData.local_address_state}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Permanent Address:</p>
                <p>
                  {studentData.permanent_address},{" "}
                  {studentData.permanent_address_city},{" "}
                  {studentData.permanent_address_state},{" "}
                  {studentData.permanent_address_country} -{" "}
                  {studentData.permanent_address_postal_code}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Aadhar Card No:</p>
                <p>{studentData.aadhar_card_no}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">PAN Card:</p>
                <p>
                  {studentData.has_pan_card}{" "}
                  {studentData.has_pan_card === "Yes" &&
                    `- ${studentData.pan_card_no}`}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Passport:</p>
                <p>
                  {studentData.has_passport}{" "}
                  {studentData.has_passport === "Yes" &&
                    `- ${studentData.passport_no} (Expires: ${new Date(
                      studentData.passport_expiry_date
                    ).toLocaleDateString()})`}
                </p>
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
                Edit Basic Details
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
                    <p className="text-red-500">
                      {errors.student_roll_no.message}
                    </p>
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
                    <p className="text-red-500">
                      {errors.date_of_birth.message}
                    </p>
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
                    {...register("program", {
                      required: "Program is required",
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.program && (
                    <p className="text-red-500">{errors.program.message}</p>
                  )}
                </label>

                <label>
                  Gender:
                  <select
                    {...register("gender", { required: "Gender is required" })}
                    className="border rounded p-2 w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
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
                    <p className="text-red-500">
                      {errors.fathers_name.message}
                    </p>
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
                    <p className="text-red-500">
                      {errors.mothers_name.message}
                    </p>
                  )}
                </label>

                <label>
                  Student Mobile No:
                  <input
                    type="tel"
                    {...register("student_mobile_no", {
                      required: "Mobile No is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Mobile No must be 10 digits",
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
                      required: "Father's Mobile No is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Mobile No must be 10 digits",
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
                        message: "Mobile No must be 10 digits",
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
                      required: "Email ID is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email ID is invalid",
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
                        value: /^\S+@\S+$/i,
                        message: "Email ID is invalid",
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
                  Local Address:
                  <input
                    type="text"
                    {...register("local_address", {
                      required: "Local Address is required",
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.local_address && (
                    <p className="text-red-500">
                      {errors.local_address.message}
                    </p>
                  )}
                </label>

                <label>
                  Local City:
                  <input
                    type="text"
                    {...register("local_address_city", {
                      required: "Local Address is required",
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.local_address_city && (
                    <p className="text-red-500">
                      {errors.local_address_city.message}
                    </p>
                  )}
                </label>

                <label className="lg:flex lg:flex-col">
                  Local Address State:
                  <select
                    {...register("local_address_state")}
                    className="border rounded p-2 w-full"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Local Address Postal Code:
                  <input
                    type="text"
                    {...register("local_address_postal_code", {
                      required: "Postal Code is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Postal Code must be 6 digits",
                      },
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.local_address_postal_code && (
                    <p className="text-red-500">
                      {errors.local_address_postal_code.message}
                    </p>
                  )}
                </label>

                <label>
                  Permanent Address:
                  <input
                    type="text"
                    {...register("permanent_address", {
                      required: "Permanent Address is required",
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.permanent_address && (
                    <p className="text-red-500">
                      {errors.permanent_address.message}
                    </p>
                  )}
                </label>

                <label className="lg:flex lg:flex-col">
                  Permanent Address State:
                  <select
                    {...register("permanent_address_state")}
                    className="border rounded p-2 w-full"
                  >
                    <option value="">Select State</option>{" "}
                    {states.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Permanent Address Postal Code:
                  <input
                    type="text"
                    {...register("permanent_address_postal_code", {
                      required: "Postal Code is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Postal Code must be 6 digits",
                      },
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.permanent_address_postal_code && (
                    <p className="text-red-500">
                      {errors.permanent_address_postal_code.message}
                    </p>
                  )}
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
                  Has PAN Card:
                  <select
                    {...register("has_pan_card")}
                    className="border rounded p-2 w-full"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>

                <label>
                  PAN Card No:
                  <input
                    type="text"
                    {...register("pan_card_no")}
                    className="border rounded p-2 w-full"
                  />
                </label>

                <label>
                  Has Passport:
                  <select
                    {...register("has_passport")}
                    className="border rounded p-2 w-full"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
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

              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white p-2 rounded"
              >
                Update Details
              </button>
            </form>
          </Modal>
        </>
      )}
    </>
  );
};
