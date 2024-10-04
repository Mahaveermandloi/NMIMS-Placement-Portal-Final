import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { FormInput } from "../FormInput";
import { states } from "../../../../Components/States";

const Diploma = () => {
  const [hasDiploma, setHasDiploma] = useState(false);

  const getPreviousYears = (count) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: count }, (_, index) => ({
      value: currentYear - index,
      label: currentYear - index,
    }));
  };

  const years = getPreviousYears(10);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <section className="flex flex-col mt-5 lg:mx-16 bg-white">
        <div className="border border-gray-400 rounded-lg p-3 lg:px-7 lg:pb-5">
          <h2 className="text-lg font-semibold underline text-gray-800 mt-5">
            Diploma Details
          </h2>

          <div className="flex items-center mb-4">
            <label htmlFor="hasDiploma" className="mr-3">
              Do you have a diploma?
            </label>
            <input
              type="radio"
              id="hasDiplomaYes"
              name="hasDiploma"
              value="yes"
              onClick={() => setHasDiploma(true)}
              {...register("hasDiploma")}
            />
            <label htmlFor="hasDiplomaYes" className="mr-3 ml-2">
              Yes
            </label>
            <input
              type="radio"
              id="hasDiplomaNo"
              name="hasDiploma"
              value="no"
              onClick={() => setHasDiploma(false)}
              {...register("hasDiploma")}
            />
            <label htmlFor="hasDiplomaNo" className="ml-2">
              No
            </label>
          </div>

          {hasDiploma && (
            <>
              <div className="grid lg:grid-cols-2 lg:gap-4 grid-cols-1 gap-5">
                <FormInput
                  id="diploma_stream"
                  label="Diploma Stream"
                  placeholder="Enter Diploma Stream"
                  register={register}
                  validation={{ required: "Diploma Stream is required" }}
                  errors={errors}
                />

                <FormInput
                  id="diploma_passing_state"
                  label="Diploma Passing State"
                  placeholder="Enter Passing State"
                  type="select"
                  register={register}
                  validation={{
                    required: "Diploma Passing State is required",
                  }}
                  errors={errors}
                  options={states}
                />

                <FormInput
                  id="diploma_passing_country"
                  label="Diploma Passing Country"
                  placeholder="Enter Passing Country"
                  register={register}
                  validation={{
                    required: "Diploma Passing Country is required",
                  }}
                  errors={errors}
                />

                <FormInput
                  id="diploma_college"
                  label="Diploma College"
                  placeholder="Enter College Name"
                  register={register}
                  validation={{ required: "Diploma College is required" }}
                  errors={errors}
                />

                <FormInput
                  id="diploma_board_of_passing"
                  label="Diploma Board of Passing"
                  placeholder="Enter Board of Passing"
                  type="select"
                  register={register}
                  validation={{
                    required: "Diploma Board of Passing is required",
                  }}
                  options={[
                    { value: "CBSE", label: "CBSE" },
                    { value: "ICSE", label: "ICSE" },
                    { value: "State Board", label: "State Board" },
                  ]}
                  errors={errors}
                />

                <FormInput
                  id="diploma_year_of_passing"
                  label="Year of Passing Diploma"
                  type="select"
                  placeholder="Enter Year of Passing"
                  register={register}
                  validation={{
                    required: "Diploma Year of Passing is required",
                    minLength: {
                      value: 4,
                      message: "Year must be 4 digits",
                    },
                    maxLength: {
                      value: 4,
                      message: "Year must be 4 digits",
                    },
                  }}
                  errors={errors}
                  options={years}
                />

                <FormInput
                  id="first_year_first_semester_percentage_diploma"
                  label="First Year First Semester Percentage"
                  type="number"
                  placeholder="Enter First Semester Percentage"
                  register={register}
                  validation={{
                    required: "First Semester Percentage is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />

                <FormInput
                  id="first_year_second_semester_percentage_diploma"
                  label="First Year Second Semester Percentage"
                  type="number"
                  placeholder="Enter Second Semester Percentage"
                  register={register}
                  validation={{
                    required: "Second Semester Percentage is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />

                <FormInput
                  id="first_year_percentage_diploma"
                  label="First Year Percentage"
                  type="number"
                  placeholder="Enter First Year Percentage"
                  register={register}
                  validation={{
                    required: "First Year Percentage is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />

                <FormInput
                  id="second_year_third_semester_percentage_diploma"
                  label="Second Year Third Semester Percentage"
                  type="number"
                  placeholder="Enter Third Semester Percentage"
                  register={register}
                  validation={{
                    required: "Third Semester Percentage is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />

                <FormInput
                  id="second_year_fourth_semester_percentage_diploma"
                  label="Second Year Fourth Semester Percentage"
                  type="number"
                  placeholder="Enter Fourth Semester Percentage"
                  register={register}
                  validation={{
                    required: "Fourth Semester Percentage is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />

                <FormInput
                  id="second_year_percentage_diploma"
                  label="Second Year Percentage"
                  type="number"
                  placeholder="Enter Second Year Percentage"
                  register={register}
                  validation={{
                    required: "Second Year Percentage is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />

                <FormInput
                  id="third_year_fifth_semester_percentage_diploma"
                  label="Third Year Fifth Semester Percentage"
                  type="number"
                  placeholder="Enter Fifth Semester Percentage"
                  register={register}
                  validation={{
                    required: "Fifth Semester Percentage is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />

                <FormInput
                  id="third_year_sixth_semester_percentage_diploma"
                  label="Third Year Sixth Semester Percentage"
                  type="number"
                  placeholder="Enter Sixth Semester Percentage"
                  register={register}
                  validation={{
                    required: "Sixth Semester Percentage is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />

                <FormInput
                  id="third_year_percentage_diploma"
                  label="Third Year Percentage"
                  type="number"
                  placeholder="Enter Third Year Percentage"
                  register={register}
                  validation={{
                    required: "Third Year Percentage is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />

                <FormInput
                  id="fourth_year_seventh_semester_percentage_diploma"
                  label="Fourth Year Seventh Semester Percentage"
                  type="number"
                  placeholder="Enter Seventh Semester Percentage"
                  register={register}
                  validation={{
                    required: "Seventh Semester Percentage is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />

                <FormInput
                  id="fourth_year_eighth_semester_percentage_diploma"
                  label="Fourth Year Eighth Semester Percentage"
                  type="number"
                  placeholder="Enter Eighth Semester Percentage"
                  register={register}
                  validation={{
                    required: "Eighth Semester Percentage is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />

                <FormInput
                  id="fourth_year_percentage_diploma"
                  label="Fourth Year Percentage"
                  type="number"
                  placeholder="Enter Fourth Year Percentage"
                  register={register}
                  validation={{
                    required: "Fourth Year Percentage is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />

                <FormInput
                  id="final_percentage_diploma"
                  label="Final Percentage Diploma"
                  type="number"
                  placeholder="Enter Final Percentage Diploma"
                  register={register}
                  validation={{
                    required: "Final Percentage Diploma is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />

                <FormInput
                  id="aggregate_percentage_diploma"
                  label="Aggregate Percentage Diploma"
                  type="number"
                  placeholder="Enter Aggregate Percentage Diploma"
                  register={register}
                  validation={{
                    required: "Aggregate Percentage Diploma is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 100, message: "Maximum value is 100" },
                  }}
                  errors={errors}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Diploma;
