// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const AnnouncementSchema = new Schema({
//   company_name: {
//     type: String,
//     required: true,
//   },

//   company_logo: {
//     type: String, // URL or file path to the company logo
//     required: false,
//   },

//   date: {
//     type: Date,
//     required: true,
//   },
//   roles_offered: {
//     type: String, // Array of roles offered by the company
//     required: true,
//   },
//   status: {
//     type: String,
//     default: "unread",
//   },

  
// });

// // Create and export the model
// const Announcement = mongoose.model("Announcement", AnnouncementSchema);
// export default Announcement;


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
    type: String, // Roles offered by the company
    required: true,
  },

  // Status field to hold student SAP numbers (initially empty)
  status: {
    type: [], // Array of student SAP numbers
    default: [], // By default, the array is empty
  },
});

// Create and export the model
const Announcement = mongoose.model("Announcement", AnnouncementSchema);
export default Announcement;
