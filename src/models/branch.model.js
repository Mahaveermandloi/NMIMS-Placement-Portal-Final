import mongoose from "mongoose";

const { Schema } = mongoose;

const BranchSchema = new Schema({
  branch_name: {
    type: String,
    required: true,
  },
  number_of_students: {
    type: Number,
    required: true,
  },
  number_of_placed_students: {
    type: Number,
    required: true,
  },
  number_of_opt_out_students: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

// Create and export the model
const Branch = mongoose.model("Branch", BranchSchema);
export default Branch;
