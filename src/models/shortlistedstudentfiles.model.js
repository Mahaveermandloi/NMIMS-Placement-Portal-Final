import mongoose from "mongoose";

const { Schema } = mongoose;

const documentSchema = new Schema({
  company_name: {
    type: String,
    required: true,
  },
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
const Document = mongoose.model("Document", documentSchema);

export default Document;
