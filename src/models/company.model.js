import mongoose from "mongoose";

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    company_name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    selection_rounds: {
      type: String,
      required: [true, "Selection rounds are required"],
    },
    eligible_branches_and_programs: {
      type: String,
      required: [true, "Eligible programs and branches are required"],
    },
    academic_criteria: {
      type: String,
      required: [true, "Academic criteria is required"],
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
    details_of_ctc: {
      type: String,
      required: [true, "Details of the CTC are required"],
    },
    ctc: {
      type: String,
      required: [true, "CTC is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: 2000,
      max: new Date().getFullYear() + 1,
    },
    company_logo: {
      type: String,
      required: false,
      
    },
    company_files: {
      type: [String], // Array of strings to store multiple file URLs or paths
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
