// import dotenv from "dotenv";
// import { app } from "./app.js";
// import connectDB from "./db/db.js";
// dotenv.config();

// const PORT = process.env.PORT;

// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`Server is running at port: ${PORT}`);
//     });
//   } catch (error) {
//     console.log("Error in index.js: ", error);
//   }
// };

// startServer();


import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/db.js";
dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
    
  } catch (error) {
    console.error("Failed to start the server: ", error.message);
    console.error("Error stack:", error.stack);
    process.exit(1); // Exit only if the server cannot start
  }
};

startServer();
