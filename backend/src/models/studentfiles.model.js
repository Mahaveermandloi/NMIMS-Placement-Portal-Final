import mongoose from "mongoose";

const { Schema } = mongoose;

const studentExcelSchema = new Schema({
 
  date: {
    type: Date,
    required: true,
  },

  filePath: {
    type: String,
    required: true,
  },
});

// Create the model
const StudentExcel = mongoose.model("StudentExcel", studentExcelSchema);

export default StudentExcel;
