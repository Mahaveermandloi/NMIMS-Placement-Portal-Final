import React from "react";
import { states } from "../../../../Components/States";

import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

import { FormInput } from "./FormInput";


const CollegeDetails = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useFormContext();

  return (
    <>
      <div className="border border-gray-400 rounded-lg p-3 lg:px-7 lg:pb-5 py-5">
        <h2 className="text-lg font-semibold underline text-gray-800 my-5">
          College Details
        </h2>

        <div className="grid lg:grid-cols-1 lg:gap-4 grid-cols-1 gap-5">
          {/* GPA and CGPA Fields for each semester */}

          <div className="grid gap-5">
            <div className="grid  gap-5 lg:grid-cols-2 border border-gray-400 rounded-lg p-3 lg:px-7 lg:pb-5 py-5">
              <FormInput
                id="gpa_first_semester_first_year"
                label="GPA First Semester First Year"
                type="number"
                placeholder="Enter GPA"
                register={register}
                validation={{
                  required: "GPA is required",
                  min: { value: 0, message: "Minimum value is 0" },
                }}
                errors={errors}
              />

              <FormInput
                id="cgpa_first_semester_first_year"
                label="CGPA First Semester First Year"
                type="number"
                placeholder="Enter CGPA"
                register={register}
                validation={{
                  required: "CGPA is required",
                  min: { value: 0, message: "Minimum value is 0" },
                }}
                errors={errors}
              />

              <FormInput
                id="academic_year_clearing_sem1"
                label="Academic Year Clearing Sem I"
                placeholder="Enter Academic Year"
                type="select"
                register={register}
                validation={{
                  required: "Academic Year is required",
                }}
                errors={errors}
                options={years}
              />

              <FormInput
                id="gpa_second_semester_first_year"
                label="GPA Second Semester First Year"
                type="number"
                placeholder="Enter GPA"
                register={register}
                validation={{
                  required: "GPA is required",
                  min: { value: 0, message: "Minimum value is 0" },
                }}
                errors={errors}
              />

              <FormInput
                id="cgpa_second_semester_first_year"
                label="CGPA Second Semester First Year"
                type="number"
                placeholder="Enter CGPA"
                register={register}
                validation={{
                  required: "CGPA is required",
                  min: { value: 0, message: "Minimum value is 0" },
                }}
                errors={errors}
              />

              <FormInput
                id="academic_year_clearing_sem2"
                label="Academic Year Clearing Sem II"
                placeholder="Enter Academic Year"
                register={register}
                validation={{
                  required: "Academic Year is required",
                }}
                errors={errors}
                options={years}
                type="select"
              />
            </div>

            <div className="grid gap-5   lg:grid-cols-2 border border-gray-400 rounded-lg p-3 lg:px-7 lg:pb-5 py-5">
              <FormInput
                id="gpa_third_semester_second_year"
                label="GPA Third Semester Second Year"
                type="number"
                placeholder="Enter GPA"
                register={register}
                validation={{
                  required: "GPA is required",
                  min: { value: 0, message: "Minimum value is 0" },
                }}
                errors={errors}
              />

              <FormInput
                id="cgpa_third_semester_second_year"
                label="CGPA Third Semester Second Year"
                type="number"
                placeholder="Enter CGPA"
                register={register}
                validation={{
                  required: "CGPA is required",
                  min: { value: 0, message: "Minimum value is 0" },
                }}
                errors={errors}
              />

              <FormInput
                id="academic_year_clearing_sem3"
                label="Academic Year Clearing Sem III"
                placeholder="Enter Academic Year"
                register={register}
                validation={{
                  required: "Academic Year is required",
                }}
                errors={errors}
                options={years}
                type="select"
              />

              <FormInput
                id="gpa_fourth_semester_second_year"
                label="GPA Fourth Semester Second Year"
                type="number"
                placeholder="Enter GPA"
                register={register}
                validation={{
                  required: "GPA is required",
                  min: { value: 0, message: "Minimum value is 0" },
                }}
                errors={errors}
              />

              <FormInput
                id="cgpa_fourth_semester_second_year"
                label="CGPA Fourth Semester Second Year"
                type="number"
                placeholder="Enter CGPA"
                register={register}
                validation={{
                  required: "CGPA is required",
                  min: { value: 0, message: "Minimum value is 0" },
                }}
                errors={errors}
              />

              <FormInput
                id="academic_year_clearing_sem4"
                label="Academic Year Clearing Sem IV"
                placeholder="Enter Academic Year"
                register={register}
                validation={{
                  required: "Academic Year is required",
                }}
                errors={errors}
                options={years}
                type="select"
              />
            </div>

            <div className="grid gap-5 lg:grid-cols-2 border border-gray-400 rounded-lg p-3 lg:px-7 lg:pb-5 py-5">
              <FormInput
                id="gpa_fifth_semester_third_year"
                label="GPA Fifth Semester Third Year"
                type="number"
                placeholder="Enter GPA"
                register={register}
                validation={{
                  required: "GPA is required",
                  min: { value: 0, message: "Minimum value is 0" },
                }}
                errors={errors}
              />

              <FormInput
                id="cgpa_fifth_semester_third_year"
                label="CGPA Fifth Semester Third Year"
                type="number"
                placeholder="Enter CGPA"
                register={register}
                validation={{
                  required: "CGPA is required",
                  min: { value: 0, message: "Minimum value is 0" },
                }}
                errors={errors}
              />

              <FormInput
                id="academic_year_clearing_sem5"
                label="Academic Year Clearing Sem V"
                placeholder="Enter Academic Year"
                register={register}
                validation={{
                  required: "Academic Year is required",
                }}
                errors={errors}
                options={years}
                type="select"
              />

              <FormInput
                id="gpa_sixth_semester_third_year"
                label="GPA Sixth Semester Third Year"
                type="number"
                placeholder="Enter GPA"
                register={register}
                validation={{
                  required: "GPA is required",
                  min: { value: 0, message: "Minimum value is 0" },
                }}
                errors={errors}
              />

              <FormInput
                id="cgpa_sixth_semester_third_year"
                label="CGPA Sixth Semester Third Year"
                type="number"
                placeholder="Enter CGPA"
                register={register}
                validation={{
                  required: "CGPA is required",
                  min: { value: 0, message: "Minimum value is 0" },
                }}
                errors={errors}
              />

              <FormInput
                id="academic_year_clearing_sem6"
                label="Academic Year Clearing Sem VI"
                placeholder="Enter Academic Year"
                register={register}
                validation={{
                  required: "Academic Year is required",
                }}
                errors={errors}
                options={years}
                type="select"
              />
            </div>
          </div>

          <FormInput
            id="reason_for_gap_or_drop_before_engineering"
            label="Reason for Gap/Drop Before Engineering"
            type="text"
            placeholder="Enter Reason"
            register={register}
            validation={{
              required: "This field is required",
            }}
            errors={errors}
          />

          <FormInput
            id="year_drop_between_engineering"
            label="Year Drop Between Engineering"
            type="number"
            placeholder="Enter Year Drop"
            register={register}
            validation={{
              required: "Year Drop is required",
              min: { value: 0, message: "Minimum value is 0" },
            }}
            errors={errors}
          />

          <FormInput
            id="years_of_gap_during_engineering"
            label="Years of Gap During Engineering"
            type="number"
            placeholder="Enter Years of Gap"
            register={register}
            validation={{
              required: "Years of Gap is required",
              min: { value: 0, message: "Minimum value is 0" },
            }}
            errors={errors}
            options={years}
          />

          <FormInput
            id="reason_for_gap_or_drop_during_engineering"
            label="Reason for Gap/Drop During Engineering"
            type="text"
            placeholder="Enter Reason"
            register={register}
            validation={{
              required: "This field is required",
            }}
            errors={errors}
          />
        </div>
      </div>
    </>
  );
};

export default CollegeDetails;
