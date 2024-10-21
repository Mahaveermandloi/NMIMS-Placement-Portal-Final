// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const AnnouncementSchema = new Schema({
//   company_name: {
//     type: String,
//     required: true,
//   },

//   company_logo: {
//     type: String, 
//     required: false,
//   },

//   date: {
//     type: Date,
//     required: true,
//   },

//   roles_offered: {
//     type: String, 
//     required: true,
//   },
  
//   status: {
//     type: [],
//     default: [],
//   },
// });

// // Create and export the model
// const Announcement = mongoose.model("Announcement", AnnouncementSchema);
// export default Announcement;



import mongoose from "mongoose";

const { Schema } = mongoose;

const AnnouncementSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  status: {
        type: [],
        default: [],
      },
});

// Create and export the model
const Announcement = mongoose.model("Announcement", AnnouncementSchema);
export default Announcement;
