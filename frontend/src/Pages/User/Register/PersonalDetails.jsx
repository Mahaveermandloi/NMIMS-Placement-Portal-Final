import React from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { states } from "../../../Components/States";
import { FormInput } from "./FormInput";

const PersonalDetails = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useFormContext();

  // Use form context from FormProvider
  const hasPanCard = watch("has_pan_card");
  const hasPassport = watch("has_passport");

  const onSubmit = (data) => {
    if (data.has_pan_card === "no") {
      data.pan_card_no = "";
    }

    if (data.has_passport === "no") {
      data.passport_no = "";
    }

    if (data.has_passport === "no") {
      data.passport_expiry_date = "";
    }

    toast.success("Form submitted successfully!");
  };

  return (
    <>
      <section className="flex flex-col mt-5 lg:mx-16 bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-xl font-bold text-gray-900">
              Personal Details
            </h2>

            <div className="grid lg:grid-cols-2 lg:gap-4 grid-cols-1 gap-5">
              {/* Your form fields here */}
              <FormInput
                id="student_sap_no"
                label="SAP ID"
                placeholder="Enter your SAP ID"
                register={register}
                validation={{
                  required: "SAP ID is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "SAP ID must be 11 digits",
                  },
                }}
                errors={errors}
              />

              <FormInput
                id="student_roll_no"
                label="Roll Number"
                placeholder="Enter your roll number"
                register={register}
                validation={{
                  required: "Roll number is required",
                }}
                errors={errors}
              />

              <FormInput
                id="campus"
                label="Campus"
                type="select"
                register={register}
                validation={{
                  required: "Campus is required",
                }}
                errors={errors}
                options={[
                  { value: "mumbai", label: "Mumbai" },
                  { value: "shirpur", label: "Shirpur" },
                ]}
              />

              <FormInput
                id="program"
                label="Program"
                type="select"
                register={register}
                validation={{
                  required: "Program is required",
                }}
                errors={errors}
                options={[
                  { value: "B.Tech", label: "B.Tech" },
                  { value: "BCA", label: "BCA" },
                  { value: "MCA", label: "MCA" },
                  { value: "MBA Tech", label: "MBA Tech" },
                ]}
              />

              <FormInput
                id="engineering_specialization"
                label="Engineering Specialization"
                type="select"
                register={register}
                validation={{
                  required: "Specialization is required",
                }}
                errors={errors}
                options={[
                  { value: "Computer Science", label: "Computer Science" },
                  {
                    value: "Information Technology",
                    label: "Information Technology",
                  },
                  {
                    value: "Computer Engineering",
                    label: "Computer Engineering",
                  },
                  {
                    value: "Artificial Intelligence and Machine Learning",
                    label: "Artificial Intelligence and Machine Learning",
                  },
                ]}
              />

              <FormInput
                id="first_name"
                label="First Name"
                placeholder="Enter your first name"
                register={register}
                validation={{
                  required: "First name is required",
                }}
                errors={errors}
              />

              <FormInput
                id="middle_name"
                label="Middle Name"
                placeholder="Enter your middle name"
                register={register}
                errors={errors}
              />

              <FormInput
                id="last_name"
                label="Last Name"
                placeholder="Enter your last name"
                register={register}
                validation={{
                  required: "Last name is required",
                }}
                errors={errors}
              />

              <FormInput
                id="name_of_student"
                label="Name of Student"
                placeholder="Enter your full name"
                register={register}
                validation={{
                  required: "Student's full name is required",
                }}
                errors={errors}
              />

              <FormInput
                id="fathers_name"
                label="Father's Name"
                placeholder="Enter your father's name"
                register={register}
                validation={{
                  required: "Father's name is required",
                }}
                errors={errors}
              />

              <FormInput
                id="mothers_name"
                label="Mother's Name"
                placeholder="Enter your mother's name"
                register={register}
                validation={{
                  required: "Mother's name is required",
                }}
                errors={errors}
              />

              <FormInput
                id="date_of_birth"
                label="Date of Birth"
                type="date"
                register={register}
                validation={{
                  required: "Date of birth is required",
                }}
                errors={errors}
              />
              <FormInput
                id="gender"
                label="Gender"
                type="select"
                register={register}
                validation={{
                  required: "Gender is required",
                }}
                errors={errors}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Others", label: "Others" },
                ]}
              />

              <FormInput
                id="local_address"
                label="Local Address"
                placeholder="Enter your local address"
                register={register}
                validation={{
                  required: "Local address is required",
                }}
                errors={errors}
              />

              <FormInput
                id="local_address_city"
                label="Local Address City"
                placeholder="Enter your local address city"
                register={register}
                validation={{
                  required: "Local address city is required",
                }}
                errors={errors}
              />

              <FormInput
                id="local_address_state"
                label="Local Address State"
                type="select"
                register={register}
                validation={{
                  required: "Local address state is required",
                }}
                errors={errors}
                options={states} // Map states array to options
              />

              <FormInput
                id="permanent_address"
                label="Permanent Address"
                placeholder="Enter your permanent address"
                register={register}
                validation={{
                  required: "Permanent address is required",
                }}
                errors={errors}
              />

              <FormInput
                id="permanent_address_postal_code"
                label="Permanent Address Postal Code"
                placeholder="Enter your permanent address postal code"
                register={register}
                validation={{
                  required: "Permanent address postal code is required",
                }}
                errors={errors}
              />

              <FormInput
                id="home_town"
                label="Home Town"
                placeholder="Enter your home town"
                register={register}
                validation={{
                  required: "Home town is required",
                }}
                errors={errors}
              />

              <FormInput
                id="permanent_address_city"
                label="Permanent Address City"
                placeholder="Enter your permanent address city"
                register={register}
                validation={{
                  required: "Permanent address city is required",
                }}
                errors={errors}
              />

              <FormInput
                id="permanent_address_state"
                label="Permanent Address State"
                type="select"
                register={register}
                validation={{
                  required: "Permanent address state is required",
                }}
                errors={errors}
                options={states} // Using the same states array for the dropdown options
              />

              <FormInput
                id="permanent_address_country"
                label="Permanent Address Country"
                placeholder="Enter your permanent address country"
                register={register}
                validation={{
                  required: "Permanent address country is required",
                }}
                errors={errors}
              />

              <FormInput
                id="student_mobile_no"
                label="Student Mobile No"
                placeholder="Enter your mobile number"
                register={register}
                validation={{
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Mobile number must be 10 digits",
                  },
                }}
                errors={errors}
              />

              <FormInput
                id="alternate_student_mobile_no"
                label="Alternate Student Mobile No"
                placeholder="Enter your alternate mobile number"
                register={register}
                errors={errors}
              />

              <FormInput
                id="fathers_mobile_no"
                label="Father's Mobile No"
                placeholder="Enter your father's mobile number"
                register={register}
                validation={{
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Father's Mobile number must be 10 digits",
                  },
                }}
                errors={errors}
              />

              <FormInput
                id="mothers_mobile_no"
                label="Mother's Mobile No"
                placeholder="Enter your mother's mobile number"
                register={register}
                errors={errors}
              />

              <FormInput
                id="home_landline_no"
                label="Home Landline No"
                placeholder="Enter your home landline number"
                register={register}
                errors={errors}
              />

              <FormInput
                id="home_mobile_no"
                label="Home Mobile No"
                placeholder="Enter your home mobile number"
                register={register}
                errors={errors}
              />

              <FormInput
                id="student_email_id"
                label="Student Email ID"
                placeholder="Enter your email ID"
                register={register}
                validation={{
                  required: "Email ID is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                }}
                errors={errors}
              />

              <FormInput
                id="student_alternate_email_id"
                label="Student Alternate Email ID"
                placeholder="Enter your alternate email ID"
                register={register}
                errors={errors}
              />

              <FormInput
                id="fathers_email_id"
                label="Father's Email ID"
                placeholder="Enter your father's email ID"
                register={register}
                errors={errors}
              />

              <FormInput
                id="mothers_email_id"
                label="Mother's Email ID"
                placeholder="Enter your mother's email ID"
                register={register}
                errors={errors}
              />

              <FormInput
                id="aadhar_card_no"
                label="Aadhar Card Number"
                placeholder="Enter your Aadhar card number"
                register={register}
                validation={{
                  required: "Aadhar card number is required",
                  pattern: {
                    value: /^[0-9]{12}$/,
                    message: "Aadhar card number must be 12 digits",
                  },
                }}
                errors={errors}
              />

              <FormInput
                id="has_pan_card"
                label="Do you have a PAN Card?"
                type="select"
                register={register}
                validation={{
                  required: "This field is required",
                }}
                errors={errors}
                options={[
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
              />

              {hasPanCard === "yes" && (
                <FormInput
                  id="pan_card_no"
                  label="PAN Card Number"
                 
                  placeholder="Enter your PAN card number"
                  register={register}
                  validation={{
                    required: "PAN card number is required",
                    pattern: {
                      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                      message: "Enter a valid PAN card number",
                    },
                  }}
                  errors={errors}
                />
              )}

              <FormInput
                id="has_passport"
                label="Do you have a Passport?"
                type="select"
                register={register}
                validation={{
                  required: "This field is required",
                }}
                errors={errors}
                options={[
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
              />

              {hasPassport === "yes" && (
                <FormInput
                  id="passport_no"
                  label="Passport Number"
                  placeholder="Enter your passport number"
                  register={register}
                  validation={{
                    required: "Passport number is required",
                    pattern: {
                      value: /^[A-Z0-9]{8,9}$/,
                      message: "Enter a valid passport number",
                    },
                  }}
                  errors={errors}
                />
              )}

              {hasPassport === "yes" && (
                <FormInput
                  id="passport_expiry_date"
                  label="Passport Expiry Date"
                  type="date"
                  register={register}
                  validation={{
                    required: "Passport expiry date is required",
                  }}
                  errors={errors}
                />
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default PersonalDetails;
