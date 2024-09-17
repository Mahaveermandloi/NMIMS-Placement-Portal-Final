import mongoose from "mongoose";

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    company_name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
