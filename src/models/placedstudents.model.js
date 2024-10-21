import mongoose from "mongoose";
import Student from "./student.model.js"; // Assuming the path to the Student model

const { Schema } = mongoose;

const PlacedStudentSchema = new Schema(
  {
    student_sap_no: {
      type: String,
      required: true,
      unique: true,
      ref: "Student", // Reference to the Student model
    },

    name_of_student: {
      type: String,
      required: true,
    },

    // Keep student_profile_image here, it will be populated
    student_profile_image: {
      type: String,
      default: "",
    },

    student_email_id: {
      type: String,
      required: true,
    },

    company_name: {
      type: String,
      required: true,
    },
    company_logo: {
      type: String,
      default: "",
    },
    job_title: {
      type: String,
      required: true,
    },
    ctc: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },

    engineering_specialization: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Create and export the model
const PlacedStudent = mongoose.model("PlacedStudent", PlacedStudentSchema);
export default PlacedStudent;
