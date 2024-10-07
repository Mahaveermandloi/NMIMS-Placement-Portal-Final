import { SERVER_URL } from "../../../Utils/URLPath";

import { GiDiploma } from "react-icons/gi";
import { FaGraduationCap } from "react-icons/fa6";
import { putApi } from "../../../Utils/API";
import { FiEdit3 } from "react-icons/fi";
import { GrContactInfo } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import Modal from "react-modal";
import { states } from "../../../Components/States";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "55%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const DiplomaStats = ({ studentData }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

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
  const onSubmit = async (data) => {
    const payload = { ...data, student_sap_no: studentData.student_sap_no };

    // setLoading(true);

    try {
      const response = await putApi(
        payload,
        `${SERVER_URL}/api/updatediplomadetails`
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
      {!studentData.diploma_stream ? (
        <>
          <div className="flex font-serif items-center my-4">
            <h3 className="font-serif font-bold text-lg text-gray-800 flex-shrink-0 pr-4">
              <div className="flex gap-5 items-center">
                <GiDiploma size={30} />
                Diploma
              </div>
            </h3>
          </div>
          <div className="flex-grow border-t border-gray-300 mb-4 "></div>
          <div className="font-serif mb-3">No Diploma Details</div>
        </>
      ) : (
        <>
          <h3 className="font-serif w-full font-bold text-lg text-gray-800 flex-shrink-0 pr-4 py-4">
            <div className="flex w-full justify-between gap-3 items-center">
              <div className="flex gap-5 items-center">
                <GiDiploma size={30} />
                Diploma
              </div>
              <FiEdit3
                size={25}
                className="cursor-pointer hover:text-gray-600"
                onClick={openModal}
              />
            </div>
          </h3>
          <div className="flex-grow border-t border-gray-300 mb-4"></div>{" "}
          <div className="mb-16">
            <div className="flex flex-col font-serif text-[16px] gap-2  ">
              <div className="flex justify-between">
                <p className="text-gray-400">Stream:</p>
                <p>{studentData.diploma_stream}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">College:</p>
                <p>{studentData.diploma_college}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Board:</p>
                <p>{studentData.diploma_board_of_passing}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Year of Passing:</p>
                <p>{studentData.diploma_year_of_passing}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">State:</p>
                <p>{studentData.diploma_passing_state}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Country:</p>
                <p>{studentData.diploma_passing_country}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">First Year First Semester %:</p>
                <p>
                  {studentData.first_year_first_semester_percentage_diploma}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">First Year Second Semester %:</p>
                <p>
                  {studentData.first_year_second_semester_percentage_diploma}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">First Year %:</p>
                <p>{studentData.first_year_percentage_diploma}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Second Year Third Semester %:</p>
                <p>
                  {studentData.second_year_third_semester_percentage_diploma}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Second Year Fourth Semester %:</p>
                <p>
                  {studentData.second_year_fourth_semester_percentage_diploma}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Second Year %:</p>
                <p>{studentData.second_year_percentage_diploma}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Third Year Fifth Semester %:</p>
                <p>
                  {studentData.third_year_fifth_semester_percentage_diploma}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Third Year Sixth Semester %:</p>
                <p>
                  {studentData.third_year_sixth_semester_percentage_diploma}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Third Year %:</p>
                <p>{studentData.third_year_percentage_diploma}</p>
              </div>

              {studentData.fourth_year_seventh_semester_percentage_diploma && (
                <>
                  <div className="flex justify-between">
                    <p className="text-gray-400">
                      Fourth Year Seventh Semester %:
                    </p>
                    <p>
                      {
                        studentData.fourth_year_seventh_semester_percentage_diploma
                      }
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-gray-400">
                      Fourth Year Eighth Semester %:
                    </p>
                    <p>
                      {
                        studentData.fourth_year_eighth_semester_percentage_diploma
                      }
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-gray-400">Fourth Year %:</p>
                    <p>{studentData.fourth_year_percentage_diploma}</p>
                  </div>
                </>
              )}

              <div className="flex justify-between">
                <p className="text-gray-400">Final Percentage:</p>
                <p>{studentData.final_percentage_diploma}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Aggregate Percentage:</p>
                <p>{studentData.aggregate_percentage_diploma}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Marksheet:</p>
                <p>
                  <a
                    href={`${studentData.diploma_marksheet}`}
                    download={`${studentData.diploma_marksheet}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Diploma MARKSHEET
                  </a>
                </p>
              </div>
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Edit Diploma Details Modal"
            ariaHideApp={false}
          >
            <div className="flex justify-between">
              <h2 className="flex font-serif font-bold text-xl mb-10 ">
                Diploma Details
              </h2>
              <RxCross1 size={30} onClick={closeModal} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="font-serif">
              <div className="grid lg:grid-cols-2 gap-4 h-96 overflow-y-scroll">
                {" "}
                <label>
                  Diploma Stream:
                  <input
                    type="text"
                    {...register("diploma_stream", {
                      required: "Diploma stream is required",
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.diploma_stream && (
                    <span className="text-red-500">
                      {errors.diploma_stream.message}
                    </span>
                  )}
                </label>
                <label className="flex flex-col">
                  Diploma Passing State:
                  <select
                    {...register("tenth_passing_state", {
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
                  {errors.tenth_passing_state && (
                    <p className="text-red-500">
                      {errors.tenth_passing_state.message}
                    </p>
                  )}
                </label>
                <label>
                  Diploma Passing Country:
                  <input
                    type="text"
                    {...register("diploma_passing_country", {
                      required: "Country of passing is required",
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.diploma_passing_country && (
                    <span className="text-red-500">
                      {errors.diploma_passing_country.message}
                    </span>
                  )}
                </label>
                <label>
                  Diploma College:
                  <input
                    type="text"
                    {...register("diploma_college", {
                      required: "College name is required",
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.diploma_college && (
                    <span className="text-red-500">
                      {errors.diploma_college.message}
                    </span>
                  )}
                </label>
                <label>
                  Diploma Board of Passing:
                  <input
                    type="text"
                    {...register("diploma_board_of_passing", {
                      required: "Board of passing is required",
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.diploma_board_of_passing && (
                    <span className="text-red-500">
                      {errors.diploma_board_of_passing.message}
                    </span>
                  )}
                </label>
                <label>
                  Diploma Year of Passing:
                  <input
                    type="number"
                    {...register("diploma_year_of_passing", {
                      required: "Year of passing is required",
                      min: { value: 1900, message: "Invalid year" },
                      max: {
                        value: new Date().getFullYear(),
                        message: "Year cannot be in the future",
                      },
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.diploma_year_of_passing && (
                    <span className="text-red-500">
                      {errors.diploma_year_of_passing.message}
                    </span>
                  )}
                </label>
                {/* First Year Diploma Fields */}
                <label>
                  First Year 1st Semester Percentage:
                  <input
                    type="number"
                    step="0.01"
                    {...register(
                      "first_year_first_semester_percentage_diploma",
                      {
                        min: { value: 0, message: "Cannot be negative" },
                        max: { value: 100, message: "Cannot exceed 100" },
                      }
                    )}
                    className="border rounded p-2 w-full"
                  />
                </label>
                <label>
                  First Year 2nd Semester Percentage:
                  <input
                    type="number"
                    step="0.01"
                    {...register(
                      "first_year_second_semester_percentage_diploma",
                      {
                        min: { value: 0, message: "Cannot be negative" },
                        max: { value: 100, message: "Cannot exceed 100" },
                      }
                    )}
                    className="border rounded p-2 w-full"
                  />
                </label>
                <label>
                  First Year Percentage:
                  <input
                    type="number"
                    step="0.01"
                    {...register("first_year_percentage_diploma", {
                      min: { value: 0, message: "Cannot be negative" },
                      max: { value: 100, message: "Cannot exceed 100" },
                    })}
                    className="border rounded p-2 w-full"
                  />
                </label>
                {/* Second Year Diploma Fields */}
                <label>
                  Second Year 3rd Semester Percentage:
                  <input
                    type="number"
                    step="0.01"
                    {...register(
                      "second_year_third_semester_percentage_diploma",
                      {
                        min: { value: 0, message: "Cannot be negative" },
                        max: { value: 100, message: "Cannot exceed 100" },
                      }
                    )}
                    className="border rounded p-2 w-full"
                  />
                </label>
                <label>
                  Second Year 4th Semester Percentage:
                  <input
                    type="number"
                    step="0.01"
                    {...register(
                      "second_year_fourth_semester_percentage_diploma",
                      {
                        min: { value: 0, message: "Cannot be negative" },
                        max: { value: 100, message: "Cannot exceed 100" },
                      }
                    )}
                    className="border rounded p-2 w-full"
                  />
                </label>
                <label>
                  Second Year Percentage:
                  <input
                    type="number"
                    step="0.01"
                    {...register("second_year_percentage_diploma", {
                      min: { value: 0, message: "Cannot be negative" },
                      max: { value: 100, message: "Cannot exceed 100" },
                    })}
                    className="border rounded p-2 w-full"
                  />
                </label>
                {/* Third Year Diploma Fields */}
                <label>
                  Third Year 5th Semester Percentage:
                  <input
                    type="number"
                    step="0.01"
                    {...register(
                      "third_year_fifth_semester_percentage_diploma",
                      {
                        min: { value: 0, message: "Cannot be negative" },
                        max: { value: 100, message: "Cannot exceed 100" },
                      }
                    )}
                    className="border rounded p-2 w-full"
                  />
                </label>
                <label>
                  Third Year 6th Semester Percentage:
                  <input
                    type="number"
                    step="0.01"
                    {...register(
                      "third_year_sixth_semester_percentage_diploma",
                      {
                        min: { value: 0, message: "Cannot be negative" },
                        max: { value: 100, message: "Cannot exceed 100" },
                      }
                    )}
                    className="border rounded p-2 w-full"
                  />
                </label>
                <label>
                  Third Year Percentage:
                  <input
                    type="number"
                    step="0.01"
                    {...register("third_year_percentage_diploma", {
                      min: { value: 0, message: "Cannot be negative" },
                      max: { value: 100, message: "Cannot exceed 100" },
                    })}
                    className="border rounded p-2 w-full"
                  />
                </label>
                {/* Final and Aggregate Percentage Fields */}
                <label>
                  Aggregate Percentage:
                  <input
                    type="number"
                    step="0.01"
                    {...register("aggregate_percentage_diploma", {
                      required: "Aggregate percentage is required",
                      min: { value: 0, message: "Cannot be negative" },
                      max: { value: 100, message: "Cannot exceed 100" },
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.aggregate_percentage_diploma && (
                    <span className="text-red-500">
                      {errors.aggregate_percentage_diploma.message}
                    </span>
                  )}
                </label>
                <label>
                  Final Percentage:
                  <input
                    type="number"
                    step="0.01"
                    {...register("final_percentage_diploma", {
                      required: "Final percentage is required",
                      min: { value: 0, message: "Cannot be negative" },
                      max: { value: 100, message: "Cannot exceed 100" },
                    })}
                    className="border rounded p-2 w-full"
                  />
                  {errors.final_percentage_diploma && (
                    <span className="text-red-500">
                      {errors.final_percentage_diploma.message}
                    </span>
                  )}
                </label>
                <label>
                  Marksheet:
                  <input
                    type="file"
                    {...register("diploma_marksheet", {
                      required: "Marksheet is required",
                    })}
                    className="border rounded p-2 w-full"
                    accept="application/pdf" // Restrict file type to PDF
                  />
                  <p className="text-gray-400">
                    Upload the Diploma Marksheet (PDF only)
                  </p>
                  {errors.diploma_marksheet && (
                    <p className="text-red-500">
                      {errors.diploma_marksheet.message}
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
