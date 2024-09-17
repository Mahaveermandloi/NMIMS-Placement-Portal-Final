import mongoose from "mongoose";

const { Schema } = mongoose;

const AnnouncementSchema = new Schema({
  company_name: {
    type: String,
    required: true,
  },
  company_logo: {
    type: String, // URL or file path to the company logo
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  roles_offered: {
    type: String, // Array of roles offered by the company
    required: true,
  },
});

// Create and export the model
const Announcement = mongoose.model("Announcement", AnnouncementSchema);
export default Announcement;
