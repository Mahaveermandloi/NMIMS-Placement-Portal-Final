import React from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { FormInput } from "../FormInput";
import { states } from "../../../../Components/States";

const Class10th = () => {
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
          <h2 className="text-lg font-semibold underline text-gray-800 my-5">
            Class 10th Details
          </h2>

          <div className="grid  lg:grid-cols-2 lg:gap-4 grid-cols-1 gap-5">
            <FormInput
              id="tenth_standard_percentage"
              label="10th Standard Percentage"
              type="number"
              placeholder="Enter your 10th Percentage"
              register={register}
              validation={{
                required: "10th Percentage is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 100, message: "Maximum value is 100" },
              }}
              errors={errors}
            />

            <FormInput
              id="year_of_passing_tenth"
              label="Year of Passing 10th"
              type="select"
              placeholder="Enter the Year"
              register={register}
              validation={{
                required: "Year of Passing 10th is required",
                minLength: { value: 4, message: "Year must be 4 digits" },
                maxLength: { value: 4, message: "Year must be 4 digits" },
              }}
              errors={errors}
              options={years}
            />

            <FormInput
              id="board_of_passing_tenth"
              label="Board of Passing 10th"
              type="select" // Specify that this is a select dropdown
              register={register}
              validation={{ required: "Board of Passing 10th is required" }}
              errors={errors}
              options={[
                { value: "CBSE", label: "CBSE" },
                { value: "ICSE", label: "ICSE" },
                { value: "State Board", label: "State Board" },
              ]}
            />

            <FormInput
              id="tenth_school"
              label="10th School Name"
              placeholder="Enter School Name"
              register={register}
              validation={{ required: "10th School Name is required" }}
              errors={errors}
            />

            <FormInput
              id="tenth_passing_state"
              label="10th Passing State"
              register={register}
              validation={{ required: "10th Passing State is required" }}
              errors={errors}
              type="select" // Specify the type as select
              options={states} // Pass the states array as options
            />

            <FormInput
              id="tenth_passing_country"
              label="10th Passing Country"
              placeholder="Enter Passing Country"
              register={register}
              validation={{ required: "10th Passing Country is required" }}
              errors={errors}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Class10th;
