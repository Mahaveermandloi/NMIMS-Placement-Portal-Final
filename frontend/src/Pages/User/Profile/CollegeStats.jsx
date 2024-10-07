import { SERVER_URL } from "../../../Utils/URLPath";
import { LuSchool } from "react-icons/lu";
import React from "react";
import { FaGraduationCap } from "react-icons/fa6";

import { FiEdit3 } from "react-icons/fi";
import { GrContactInfo } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import Modal from "react-modal";
import { putApi } from "../../../Utils/API";
import { Toast } from "../../../Components/Toast";
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
export const CollegeStats = ({ studentData }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

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
    reset(studentData); // Populate the form with studentData when opening the modal
    setIsOpen(true);
  };

  // useEffect(() => {
  //   if (modalIsOpen && studentData) {
  //     reset(studentData); // This will populate the form with student data
  //   }
  // }, [modalIsOpen, studentData, reset]);

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
        `${SERVER_URL}/api/updatecollegedetails`
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
      <div className="mb-16">
        <h3 className="font-serif w-full font-bold text-lg text-gray-800 flex-shrink-0 pr-4 py-4">
          <div className="flex w-full justify-between gap-3 items-center">
            <div className="flex gap-5 items-center">
              <LuSchool size={30} />
              College
            </div>
            <FiEdit3
              size={25}
              className="cursor-pointer hover:text-gray-600"
              onClick={openModal}
            />
          </div>
        </h3>
        <div className="flex-grow border-t border-gray-300 mb-4"></div>{" "}
        <div className="flex flex-col gap-10 ">
          {/* GPA, CGPA and academic year clearing */}
          <div className="flex flex-col font-serif text-[16px] gap-2">
            <div className="flex justify-between">
              <p className="text-gray-400">Academic Year Clearing Sem 1:</p>
              <p>{studentData.academic_year_clearing_sem1}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">1st Semester GPA:</p>
              <p>{studentData.gpa_first_semester_first_year}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">1st Semester CGPA:</p>
              <p>{studentData.cgpa_first_semester_first_year}</p>
            </div>

            <hr />
            <div className="flex justify-between">
              <p className="text-gray-400">Academic Year Clearing Sem 2:</p>
              <p>{studentData.academic_year_clearing_sem2}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">2nd Semester GPA:</p>
              <p>{studentData.gpa_second_semester_first_year}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">2nd Semester CGPA:</p>
              <p>{studentData.cgpa_second_semester_first_year}</p>
            </div>

            <hr />

            <div className="flex justify-between">
              <p className="text-gray-400">Academic Year Clearing Sem 3:</p>
              <p>{studentData.academic_year_clearing_sem3}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">3rd Semester GPA:</p>
              <p>{studentData.gpa_third_semester_second_year}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">3rd Semester CGPA:</p>
              <p>{studentData.cgpa_third_semester_second_year}</p>
            </div>

            <hr />

            <div className="flex justify-between">
              <p className="text-gray-400">Academic Year Clearing Sem 4:</p>
              <p>{studentData.academic_year_clearing_sem4}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">4th Semester GPA:</p>
              <p>{studentData.gpa_fourth_semester_second_year}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">4th Semester CGPA:</p>
              <p>{studentData.cgpa_fourth_semester_second_year}</p>
            </div>

            <hr />

            <div className="flex justify-between">
              <p className="text-gray-400">Academic Year Clearing Sem 5:</p>
              <p>{studentData.academic_year_clearing_sem5}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">5th Semester GPA:</p>
              <p>{studentData.gpa_fifth_semester_third_year}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">5th Semester CGPA:</p>
              <p>{studentData.cgpa_fifth_semester_third_year}</p>
            </div>

            <hr />

            <div className="flex justify-between">
              <p className="text-gray-400">Academic Year Clearing Sem 6:</p>
              <p>{studentData.academic_year_clearing_sem6}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">6th Semester GPA:</p>
              <p>{studentData.gpa_sixth_semester_third_year}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">6th Semester CGPA:</p>
              <p>{studentData.cgpa_sixth_semester_third_year}</p>
            </div>
          </div>

          {/* Marksheet Links */}
          <div className="mt-10 lg:mt-0 flex flex-col font-serif text-[16px] gap-2">
            <div className="flex justify-between">
              <p className="text-gray-400">Resume / CV:</p>
              <p>
                <a
                  href={`${studentData.student_cv}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View ResumeCV
                </a>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Marksheet SEM I:</p>
              <p>
                <a
                  href={`${studentData.student_marksheet_sem_1}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Marksheet
                </a>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Marksheet SEM II:</p>
              <p>
                <a
                  href={`${studentData.student_marksheet_sem_2}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Marksheet
                </a>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Marksheet SEM III:</p>
              <p>
                <a
                  href={`${studentData.student_marksheet_sem_3}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Marksheet
                </a>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Marksheet SEM IV:</p>
              <p>
                <a
                  href={`${studentData.student_marksheet_sem_4}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Marksheet
                </a>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Marksheet SEM V:</p>
              <p>
                <a
                  href={`${studentData.student_marksheet_sem_5}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Marksheet
                </a>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Marksheet SEM VI:</p>
              <p>
                <a
                  href={`${studentData.student_marksheet_sem_6}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Marksheet
                </a>
              </p>
            </div>
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
            College Details
          </h2>
          <RxCross1 size={30} onClick={closeModal} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="font-serif">
          <div className="grid lg:grid-cols-2 gap-4 h-96 overflow-y-scroll">
            {/* GPA and CGPA Fields */}
            {["first", "second", "third", "fourth", "fifth", "sixth"].map(
              (semester, index) => (
                <React.Fragment key={index}>
                  <label>
                    GPA {index + 1} Semester:
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `gpa_${semester}_semester_${Math.ceil(
                          (index + 1) / 2
                        )}_year`,
                        { required: "GPA is required" }
                      )}
                      className="border rounded p-2 w-full"
                    />
                    {errors[
                      `gpa_${semester}_semester_${Math.ceil(
                        (index + 1) / 2
                      )}_year`
                    ] && (
                      <p className="text-red-500">
                        {
                          errors[
                            `gpa_${semester}_semester_${Math.ceil(
                              (index + 1) / 2
                            )}_year`
                          ].message
                        }
                      </p>
                    )}
                  </label>

                  <label>
                    CGPA {index + 1} Semester:
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `cgpa_${semester}_semester_${Math.ceil(
                          (index + 1) / 2
                        )}_year`,
                        { required: "CGPA is required" }
                      )}
                      className="border rounded p-2 w-full"
                    />
                    {errors[
                      `cgpa_${semester}_semester_${Math.ceil(
                        (index + 1) / 2
                      )}_year`
                    ] && (
                      <p className="text-red-500">
                        {
                          errors[
                            `cgpa_${semester}_semester_${Math.ceil(
                              (index + 1) / 2
                            )}_year`
                          ].message
                        }
                      </p>
                    )}
                  </label>

                  <label>
                    Academic Year Clearing Sem {index + 1}:
                    <input
                      type="number"
                      {...register(`academic_year_clearing_sem${index + 1}`, {
                        required: "Academic year is required",
                      })}
                      className="border rounded p-2 w-full"
                    />
                    {errors[`academic_year_clearing_sem${index + 1}`] && (
                      <p className="text-red-500">
                        {
                          errors[`academic_year_clearing_sem${index + 1}`]
                            .message
                        }
                      </p>
                    )}
                  </label>
                </React.Fragment>
              )
            )}

            {/* KT Fields */}
            <label>
              Total Dead KTs:
              <input
                type="number"
                {...register("total_dead_kts", {
                  required: "Total dead KTs are required",
                })}
                className="border rounded p-2 w-full"
              />
              {errors.total_dead_kts && (
                <p className="text-red-500">{errors.total_dead_kts.message}</p>
              )}
            </label>

            <label>
              Total Live KTs:
              <input
                type="number"
                {...register("total_live_kts", {
                  required: "Total live KTs are required",
                })}
                className="border rounded p-2 w-full"
              />
              {errors.total_live_kts && (
                <p className="text-red-500">{errors.total_live_kts.message}</p>
              )}
            </label>

            {/* Gap and Drop Fields */}
            <label>
              Year Drop or Gap:
              <input
                type="text"
                {...register("has_year_drop_or_gap", {
                  required: "This field is required",
                })}
                className="border rounded p-2 w-full"
              />
              {errors.has_year_drop_or_gap && (
                <p className="text-red-500">
                  {errors.has_year_drop_or_gap.message}
                </p>
              )}
            </label>

            <label>
              Year Drop Between Tenth and Engineering:
              <input
                type="text"
                {...register(
                  "year_drop_between_tenth_and_beginning_of_engineering",
                  { required: "This field is required" }
                )}
                className="border rounded p-2 w-full"
              />
              {errors.year_drop_between_tenth_and_beginning_of_engineering && (
                <p className="text-red-500">
                  {
                    errors.year_drop_between_tenth_and_beginning_of_engineering
                      .message
                  }
                </p>
              )}
            </label>

            <label>
              Years of Gap Before Engineering:
              <input
                type="number"
                {...register("years_of_gap", {
                  required: "This field is required",
                })}
                className="border rounded p-2 w-full"
              />
              {errors.years_of_gap && (
                <p className="text-red-500">{errors.years_of_gap.message}</p>
              )}
            </label>

            <label>
              Reason for Gap or Drop Before Engineering:
              <textarea
                {...register("reason_for_gap_or_drop_before_engineering", {
                  required: "This field is required",
                })}
                className="border rounded p-2 w-full"
              />
              {errors.reason_for_gap_or_drop_before_engineering && (
                <p className="text-red-500">
                  {errors.reason_for_gap_or_drop_before_engineering.message}
                </p>
              )}
            </label>

            <label>
              Year Drop Between Engineering:
              <input
                type="text"
                {...register("year_drop_between_engineering", {
                  required: "This field is required",
                })}
                className="border rounded p-2 w-full"
              />
              {errors.year_drop_between_engineering && (
                <p className="text-red-500">
                  {errors.year_drop_between_engineering.message}
                </p>
              )}
            </label>

            <label>
              Years of Gap During Engineering:
              <input
                type="number"
                {...register("years_of_gap_during_engineering", {
                  required: "This field is required",
                })}
                className="border rounded p-2 w-full"
              />
              {errors.years_of_gap_during_engineering && (
                <p className="text-red-500">
                  {errors.years_of_gap_during_engineering.message}
                </p>
              )}
            </label>

            <label>
              Reason for Gap or Drop During Engineering:
              <textarea
                {...register("reason_for_gap_or_drop_during_engineering", {
                  required: "This field is required",
                })}
                className="border rounded p-2 w-full"
              />
              {errors.reason_for_gap_or_drop_during_engineering && (
                <p className="text-red-500">
                  {errors.reason_for_gap_or_drop_during_engineering.message}
                </p>
              )}
            </label>

            {/* Upload Fields */}
            <label>
              Last Received Marksheet:
              <input
                type="date"
                {...register("last_received_marksheet", {
                  required: "Marksheet is required",
                })}
                className="border rounded p-2 w-full"
              />
              {errors.last_received_marksheet && (
                <p className="text-red-500">
                  {errors.last_received_marksheet.message}
                </p>
              )}
            </label>

            <label>
              CV Uploaded in NMIMS Format:
              <select
                {...register("cv_uploaded_in_nmims_format", {
                  required: "This field is required",
                })}
                className="border rounded p-2 w-full"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.cv_uploaded_in_nmims_format && (
                <p className="text-red-500">
                  {errors.cv_uploaded_in_nmims_format.message}
                </p>
              )}
            </label>

            <label>
              Documents Uploaded:
              <select
                {...register("documents_uploaded", {
                  required: "This field is required",
                })}
                className="border rounded p-2 w-full"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.documents_uploaded && (
                <p className="text-red-500">
                  {errors.documents_uploaded.message}
                </p>
              )}
            </label>
            {/* File Uploads for Profile Image and CV */}

            <label>
              Upload CV:
              <input
                type="file"
                {...register("student_cv", {
                  required: "CV upload is required",
                  validate: {
                    validateFileType: (value) => {
                      const fileType = value[0]?.type;
                      return (
                        fileType === "application/pdf" ||
                        "Please upload a PDF file."
                      );
                    },
                  },
                })}
                accept="application/pdf" // Accepts only PDF files
                className="border rounded p-2 w-full"
              />
              {errors.student_cv && (
                <p className="text-red-500">{errors.student_cv.message}</p>
              )}
            </label>

            <label>
              Upload Student Marksheets:
              <input
                type="file"
                multiple // Allows multiple file selection
                {...register("student_marksheet", {
                  required: "Marksheet uploads are required",
                  validate: {
                    validateFileType: (value) => {
                      // Validate that each file is a PDF
                      for (let i = 0; i < value.length; i++) {
                        const fileType = value[i]?.type;
                        if (fileType !== "application/pdf") {
                          return "Please upload only PDF files.";
                        }
                      }
                      return true;
                    },
                  },
                })}
                accept="application/pdf" // Only PDF files are allowed
                className="border rounded p-2 w-full"
              />
              {errors.student_marksheet && (
                <p className="text-red-500">
                  {errors.student_marksheet.message}
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
  );
};
