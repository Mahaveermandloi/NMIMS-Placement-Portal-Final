import mongoose from "mongoose";

const { Schema } = mongoose;

const JobListingSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    ref: "Company", // Reference to the Company model
    required: true,
  },
  job_title: {
    type: String,
    required: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  job_type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  company_logo: { // Fixed typo: 'tpye' to 'type'
    type: String,
    default: "",
  },
  ctc: {
    type: String,
    required: true,
  },
  application_deadline: {
    type: Date,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

// Create and export the model
const JobListing = mongoose.model("JobListing", JobListingSchema);
export default JobListing;
