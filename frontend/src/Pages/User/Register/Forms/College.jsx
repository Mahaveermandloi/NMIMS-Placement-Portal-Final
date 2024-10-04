import React from "react";
import { useFormContext } from "react-hook-form";
import { FormInput } from "../FormInput";

const College = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const getPreviousYears = (count) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: count }, (_, index) => ({
      value: currentYear - index,
      label: currentYear - index,
    }));
  };

  const years = getPreviousYears(10);

  return (
    <>
      <section className="flex w-[80%]  flex-col mt-5 lg:mx-16 bg-white  ">
        <div className="border border-gray-400 rounded-lg p-3 lg:px-7 lg:pb-5">
          <h2 className="text-lg font-semibold underline text-gray-800 mt-5">
            College Details
          </h2>

          <div className="grid lg:grid-cols-2   mt-5  lg:gap-4 grid-cols-1 gap-5">
            {/* First Year Semester 1 */}
            <FormInput
              id="gpa_first_semester_first_year"
              label="GPA First Semester First Year"
              type="number"
              placeholder="Enter GPA"
              register={register}
              validation={{
                required: "GPA First Semester First Year is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 4, message: "Maximum value is 4" },
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
                required: "CGPA First Semester First Year is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 4, message: "Maximum value is 4" },
              }}
              errors={errors}
            />
            <FormInput
              id="academic_year_clearing_sem1"
              label="Academic Year Clearing Semester 1"
              type="select"
              placeholder="Enter Year"
              register={register}
              validation={{
                required: "Year is required",
                minLength: { value: 4, message: "Year must be 4 digits" },
                maxLength: { value: 4, message: "Year must be 4 digits" },
              }}
              errors={errors}
              options={years}
            />
            {/* First Year Semester 2 */}
            <FormInput
              id="gpa_second_semester_first_year"
              label="GPA Second Semester First Year"
              type="number"
              placeholder="Enter GPA"
              register={register}
              validation={{
                required: "GPA Second Semester First Year is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 4, message: "Maximum value is 4" },
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
                required: "CGPA Second Semester First Year is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 4, message: "Maximum value is 4" },
              }}
              errors={errors}
            />
            <FormInput
              id="academic_year_clearing_sem2"
              label="Academic Year Clearing Semester 2"
              type="select"
              placeholder="Enter Year"
              register={register}
              validation={{
                required: "Year is required",
                minLength: { value: 4, message: "Year must be 4 digits" },
                maxLength: { value: 4, message: "Year must be 4 digits" },
              }}
              errors={errors}
              options={years}
            />
            {/* Second Year Semester 3 */}
            <FormInput
              id="gpa_third_semester_second_year"
              label="GPA Third Semester Second Year"
              type="number"
              placeholder="Enter GPA"
              register={register}
              validation={{
                required: "GPA Third Semester Second Year is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 4, message: "Maximum value is 4" },
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
                required: "CGPA Third Semester Second Year is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 4, message: "Maximum value is 4" },
              }}
              errors={errors}
            />
            <FormInput
              id="academic_year_clearing_sem3"
              label="Academic Year Clearing Semester 3"
              type="select"
              placeholder="Enter Year"
              register={register}
              validation={{
                required: "Year is required",
                minLength: { value: 4, message: "Year must be 4 digits" },
                maxLength: { value: 4, message: "Year must be 4 digits" },
              }}
              errors={errors}
              options={years}
            />
            {/* Second Year Semester 4 */}
            <FormInput
              id="gpa_fourth_semester_second_year"
              label="GPA Fourth Semester Second Year"
              type="number"
              placeholder="Enter GPA"
              register={register}
              validation={{
                required: "GPA Fourth Semester Second Year is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 4, message: "Maximum value is 4" },
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
                required: "CGPA Fourth Semester Second Year is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 4, message: "Maximum value is 4" },
              }}
              errors={errors}
            />
            <FormInput
              id="academic_year_clearing_sem4"
              label="Academic Year Clearing Semester 4"
              type="select"
              placeholder="Enter Year"
              register={register}
              validation={{
                required: "Year is required",
                minLength: { value: 4, message: "Year must be 4 digits" },
                maxLength: { value: 4, message: "Year must be 4 digits" },
              }}
              errors={errors}
              options={years}
            />
            {/* Third Year Semester 5 */}
            <FormInput
              id="gpa_fifth_semester_third_year"
              label="GPA Fifth Semester Third Year"
              type="number"
              placeholder="Enter GPA"
              register={register}
              validation={{
                required: "GPA Fifth Semester Third Year is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 4, message: "Maximum value is 4" },
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
                required: "CGPA Fifth Semester Third Year is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 4, message: "Maximum value is 4" },
              }}
              errors={errors}
            />
            <FormInput
              id="academic_year_clearing_sem5"
              label="Academic Year Clearing Semester 5"
              type="select"
              placeholder="Enter Year"
              register={register}
              validation={{
                required: "Year is required",
                minLength: { value: 4, message: "Year must be 4 digits" },
                maxLength: { value: 4, message: "Year must be 4 digits" },
              }}
              errors={errors}
              options={years}
            />
            {/* Third Year Semester 6 */}
            <FormInput
              id="gpa_sixth_semester_third_year"
              label="GPA Sixth Semester Third Year"
              type="number"
              placeholder="Enter GPA"
              register={register}
              validation={{
                required: "GPA Sixth Semester Third Year is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 4, message: "Maximum value is 4" },
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
                required: "CGPA Sixth Semester Third Year is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 4, message: "Maximum value is 4" },
              }}
              errors={errors}
            />
            <FormInput
              id="academic_year_clearing_sem6"
              label="Academic Year Clearing Semester 6"
              type="select"
              placeholder="Enter Year"
              register={register}
              validation={{
                required: "Year is required",
                minLength: { value: 4, message: "Year must be 4 digits" },
                maxLength: { value: 4, message: "Year must be 4 digits" },
              }}
              errors={errors}
              options={years}
            />

            <FormInput
              id="total_dead_kts"
              label="Total Dead KT's"
              type="number"
              placeholder="Total Dead KT's"
              register={register}
              validation={{
                required: "Total Dead KT's are required",
                min: { value: 0, message: "Minimum KT's can be 0" },
                max: { value: 3, message: "Maximum KT's can be 3" },
              }}
              errors={errors}
            />

            <FormInput
              id="total_live_kts"
              label="Total Live KT's"
              type="number"
              placeholder="Total Live KT's"
              register={register}
              validation={{
                required: "Total Live KT's are required",
                min: { value: 0, message: "Minimum KT's can be 0" },
                max: { value: 3, message: "Maximum KT's can be 3" },
              }}
              errors={errors}
            />

            <FormInput
              id="last_received_marksheet"
              label="Last Received Student Marksheet(s)"
              type="date"
              placeholder="Last Received Student Marksheets"
              register={register}
              validation={{
                required: "Last marksheet Date is required",
              }}
              errors={errors}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default College;
