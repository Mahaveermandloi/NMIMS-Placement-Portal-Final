import React from "react";
import { states } from "../../../../Components/States";
import { useForm } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { FormInput } from "../FormInput";

const Class12th = () => {
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
            Class 12th Details
          </h2>
          <div className="grid lg:grid-cols-2 lg:gap-4 grid-cols-1 gap-5">
           
            <FormInput
              id="twelfth_standard_percentage"
              label="12th Standard Percentage"
              type="number"
              placeholder="Enter your 12th Percentage"
              register={register}
              validation={{
                required: "12th Percentage is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 100, message: "Maximum value is 100" },
              }}
              errors={errors}
            />

            <FormInput
              id="year_of_passing_twelfth"
              label="Year of Passing 12th"
              type="select"
              placeholder="Enter the Year"
              register={register}
              validation={{
                required: "Year of Passing 12th is required",
                minLength: { value: 4, message: "Year must be 4 digits" },
                maxLength: { value: 4, message: "Year must be 4 digits" },
              }}
              errors={errors}
              options={years}
            />

            <FormInput
              id="board_of_passing_twelfth"
              label="Board of Passing 12th"
              type="select"
              placeholder="Enter Board Name"
              register={register}
              validation={{ required: "Board of Passing 12th is required" }}
              errors={errors}
              options={[
                { value: "CBSE", label: "CBSE" },
                { value: "ICSE", label: "ICSE" },
                { value: "State Board", label: "State Board" },
              ]}
            />

            <FormInput
              id="twelfth_school"
              label="12th School Name"
              placeholder="Enter School Name"
              register={register}
              validation={{ required: "12th School Name is required" }}
              errors={errors}
            />

            <FormInput
              id="twelfth_school_city"
              label="12th School City"
              placeholder="Enter School City"
              register={register}
              validation={{ required: "12th School City is required" }}
              errors={errors}
            />

            <FormInput
              id="twelfth_passing_state"
              label="12th Passing State"
              placeholder="Enter Passing State"
              register={register}
              validation={{ required: "12th Passing State is required" }}
              errors={errors}
              type="select"
              options={states}
            />

            <FormInput
              id="twelfth_passing_country"
              label="12th Passing Country"
              placeholder="Enter Passing Country"
              register={register}
              validation={{ required: "12th Passing Country is required" }}
              errors={errors}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Class12th;
