// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.DB_URL);
    
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Database connection failed", error.message);
//     console.error("Error stack:", error.stack);
//     process.exit(1);
//   }
// };

// export default connectDB;


import mongoose from "mongoose";

const connectDB = async (retries = 10, delay = 5000) => {
  while (retries) {
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connected successfully");
      break;
    } catch (error) {
      console.error("Database connection failed", error.message);
      console.error("Error stack:", error.stack);
      
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      
      if (retries === 0) {
        console.error("Could not connect to the database after multiple attempts.");
        process.exit(1);
      }
      
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

export default connectDB;
