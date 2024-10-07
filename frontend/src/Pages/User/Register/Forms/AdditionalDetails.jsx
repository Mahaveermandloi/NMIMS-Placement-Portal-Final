import React from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { FormInput } from "../FormInput";

const AdditionalDetails = () => {
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
    setValue,
    watch,
  } = useFormContext();

  const onFileChange = (e) => {
    const files = e.target.files;
    setValue(e.target.name, files, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
   
  };

  const hasYearDropOrGap = watch("has_year_drop_or_gap");
  const cvFile = watch("student_cv");
  const profileImage = watch("student_profile_image");
  const marksheets = watch("student_marksheet");

  return (
    <section className="flex flex-col mt-5 lg:mx-16 bg-white">
      <div className="border border-gray-400 rounded-lg p-3 lg:px-7 lg:pb-5">
        <h2 className="text-lg font-semibold underline text-gray-800 my-5">
          Additional Details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid lg:grid-cols-2 lg:gap-4 grid-cols-1 gap-5">
            <FormInput
              id="has_year_drop_or_gap"
              label="Has Year drop or gap"
              type="select"
              register={register}
              validation={{ required: "Please select an option" }}
              errors={errors}
              options={[
                { value: "YES", label: "YES" },
                { value: "NO", label: "NO" },
              ]}
            />

            {hasYearDropOrGap === "YES" && (
              <>
                <FormInput
                  id="years_of_gap"
                  label="Years of Gap"
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
                  id="year_drop_between_tenth_and_beginning_of_engineering"
                  label="Year Drop Between Tenth and Beginning Engineering"
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
                  validation={{ required: "This field is required" }}
                  errors={errors}
                />
              </>
            )}

            <FormInput
              id="cv_uploaded_in_nmims_format"
              label="CV Uploaded in NMIMS Format"
              type="select"
              register={register}
              validation={{ required: "Please select an option" }}
              errors={errors}
              options={[
                { value: "YES", label: "YES" },
                { value: "NO", label: "NO" },
              ]}
            />

            <FormInput
              id="documents_uploaded"
              label="Documents Uploaded"
              type="select"
              register={register}
              validation={{ required: "Please select an option" }}
              errors={errors}
              options={[
                { value: "YES", label: "YES" },
                { value: "NO", label: "NO" },
              ]}
            />

            <div>
              <FormInput
                id="student_cv"
                label="Student CV"
                type="file"
                placeholder="Upload CV"
                register={register}
                validation={{ required: "CV is required" }}
                errors={errors}
                accept="application/pdf"
                onChange={onFileChange}
              />

              {cvFile && cvFile.length > 0 && (
                <p className="text-sm text-green-500">
                  Selected CV: {cvFile[0].name}
                </p>
              )}
            </div>

            <div>
              <FormInput
                id="student_profile_image"
                label="Student Profile Image"
                type="file"
                placeholder="Upload Profile Image"
                register={register}
                validation={{
                  required: "Profile image is required",
                }}
                errors={errors}
                accept="image/png, image/jpeg"
                onChange={onFileChange}
              />

              {profileImage && profileImage.length > 0 && (
                <p className="text-sm text-green-500">
                  Selected Profile Image: {profileImage[0].name}
                </p>
              )}
            </div>
            <div>
              <FormInput
                id="student_marksheet"
                label="Student Marksheet(s)"
                type="file"
                placeholder="Upload Marksheet(s)"
                register={register}
                validation={{
                  required: "At least one marksheet is required",
                }}
                errors={errors}
                multiple={true}
                accept="application/pdf" // Change according to your needs
                onChange={onFileChange}
              />

              {marksheets && marksheets.length > 0 && (
                <ul>
                  {Array.from(marksheets).map((file, index) => (
                    <li key={index} className="text-sm text-green-500">
                      {" "}
                      {file.name}
                    </li> // Display each file name
                  ))}
                </ul>
              )}

              <p className="text-red-500 text-sm">
                You can upload multiple marksheets *
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdditionalDetails;
