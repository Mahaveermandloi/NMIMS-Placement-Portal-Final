import { SERVER_URL } from "../../../Utils/URLPath";
import { FaGraduationCap } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { putApi } from "../../../Utils/API";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import Modal from "react-modal";
import { states } from "../../../Components/States";
import { Toast } from "../../../Components/Toast";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader";
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

export const TwelfthStats = ({ studentData }) => {
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

  const openModal = () => {
    reset(studentData);
    setIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    const payload = { ...data, student_sap_no: studentData.student_sap_no };

    setLoading(true);

    try {
      const response = await putApi(
        payload,
        `${SERVER_URL}/api/updatetwelfthdetails`
      );
      if (response.statusCode === 200) {
        setLoading(false);
        toast.success("Student Data Updated Successfully");
        closeModal();
        window.location.reload();
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
          <div className="mb-16">
            <h3 className="font-serif w-full font-bold text-lg text-gray-800 flex-shrink-0 pr-4 py-4">
              <div className="flex w-full justify-between gap-3 items-center">
                <div className="flex gap-5 items-center">
                  <FaGraduationCap size={30} />
                  Class XII
                </div>
                <FiEdit3
                  size={25}
                  className="cursor-pointer hover:text-gray-600"
                  onClick={openModal}
                />
              </div>
            </h3>
            <div className="flex-grow border-t border-gray-300 mb-4"></div>{" "}
            <div className="flex flex-col font-serif text-[16px] gap-2">
              <div className="flex justify-between">
                <p className="text-gray-400">School:</p>
                <p>{studentData.twelfth_school}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">School City:</p>
                <p>{studentData.twelfth_school_city}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Board:</p>
                <p>{studentData.board_of_passing_twelfth}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Programme/Degree:</p>
                <p>12th</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Percentage:</p>
                <p>{studentData.twelfth_standard_percentage}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Year of Passing:</p>
                <p>{studentData.year_of_passing_twelfth}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">State:</p>
                <p>{studentData.twelfth_passing_state}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Country:</p>
                <p>{studentData.twelfth_passing_country}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Marksheet:</p>
                <p>
                  <a
                    href={`${studentData.twelfth_marksheet}`}
                    download={`${studentData.twelfth_marksheet}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Class XII MARKSHEET
                  </a>
                </p>
              </div>
            </div>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Edit Class XII Details Modal"
            ariaHideApp={false}
          >
            <div className="flex justify-between">
              <h2 className="flex font-serif font-bold text-xl mb-10">
                Class XII Details
              </h2>
              <RxCross1 size={30} onClick={closeModal} />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="font-serif">
              <div className="grid lg:grid-cols-2 gap-4 h-96 overflow-y-scroll">
                <label>
                  School:
                  <input
                    type="text"
                    {...register("twelfth_school", {
                      required: "School name is required",
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.twelfth_school && (
                    <p className="text-red-500">
                      {errors.twelfth_school.message}
                    </p>
                  )}
                </label>

                <label>
                  Board:
                  <select
                    {...register("board_of_passing_twelfth", {
                      required: "Board is required",
                    })}
                    className="border rounded p-2 w-full"
                  >
                    <option value="">Select a board</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                  </select>
                  {errors.board_of_passing_twelfth && (
                    <p className="text-red-500">
                      {errors.board_of_passing_twelfth.message}
                    </p>
                  )}
                </label>

                <label>
                  Programme/Degree:
                  <input
                    type="text"
                    value="12th"
                    readOnly
                    className="border rounded p-2 w-full bg-gray-100"
                  />
                </label>

                <label>
                  Percentage:
                  <input
                    type="number"
                    step="0.01" // Allows decimal numbers
                    {...register("twelfth_standard_percentage", {
                      required: "Percentage is required",
                      min: { value: 0, message: "Minimum value is 0" },
                      max: { value: 100, message: "Maximum value is 100" },
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.twelfth_standard_percentage && (
                    <p className="text-red-500">
                      {errors.twelfth_standard_percentage.message}
                    </p>
                  )}
                </label>

                <label>
                  Year of Passing:
                  <input
                    type="number"
                    {...register("year_of_passing_twelfth", {
                      required: "Year of Passing is required",
                      min: {
                        value: 1900,
                        message: "Year must be at least 1900",
                      },
                      max: {
                        value: new Date().getFullYear() - 3, // Set max to 3 years back from the current year
                        message: `Year must be no more than ${
                          new Date().getFullYear() - 3
                        }`,
                      },
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.year_of_passing_twelfth && (
                    <p className="text-red-500">
                      {errors.year_of_passing_twelfth.message}
                    </p>
                  )}
                </label>

                <label>
                  State:
                  <select
                    {...register("twelfth_passing_state", {
                      required: "State is required",
                    })}
                    className="border rounded p-2 w-full"
                  >
                    <option value="">Select a state</option>
                    {states.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                  {errors.twelfth_passing_state && (
                    <p className="text-red-500">
                      {errors.twelfth_passing_state.message}
                    </p>
                  )}
                </label>

                <label>
                  Country:
                  <input
                    type="text"
                    {...register("twelfth_passing_country", {
                      required: "Country is required",
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.twelfth_passing_country && (
                    <p className="text-red-500">
                      {errors.twelfth_passing_country.message}
                    </p>
                  )}
                </label>

                <label>
                  Marksheet:
                  <input
                    type="file"
                    {...register("twelfth_marksheet", {
                      required: "Marksheet is required",
                    })}
                    className="border rounded p-2 w-full"
                    accept="application/pdf" // Restrict file type to PDF
                  />
                  <p className="text-gray-400">
                    Upload the Class XII Marksheet (PDF only)
                  </p>
                  {errors.twelfth_marksheet && (
                    <p className="text-red-500">
                      {errors.twelfth_marksheet.message}
                    </p>
                  )}
                </label>
              </div>

              <div className="flex items-center mt-10 gap-10">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </>
  );
};
