import mongoose from "mongoose";

const { Schema } = mongoose;

const ShortlistedStudentSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    ref: "Company", // Reference to the Company model
    required: true,
  },
  job_id: {
    type: Schema.Types.ObjectId,
    ref: "Job", // Reference to the Job model
    // required: true,
  },
  student_sap_no: {
    type: String,
    required: true,
    unique: false,
  },
  company_name: {
    type: String,
    required: true,
  },
  name_of_student: {
    type: String,
    required: true,
  },
  job_title: {
    type: String,
    // required: true,
  },
  student_email_id: {
    type: String,
    required: true,
  },
  engineering_specialization: {
    type: String,
    default: "",
  },
  year: {
    type: Number,
    required: true,
  },
  student_profile_image: {
    type: String,
    default: "",
  },
});

// Create and export the model
const ShortlistedStudent = mongoose.model(
  "ShortlistedStudent",
  ShortlistedStudentSchema
);
export default ShortlistedStudent;
