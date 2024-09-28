import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import PlacedStudent from "../models/placedstudents.model.js";
import Student from "../models/student.model.js";

const placementStats = asyncHandler(async (req, res) => {
  try {
    const placedStudents = await PlacedStudent.find();
    const allStudents = await Student.find(); // Fetch all students

    if (!placedStudents.length) {
      throw new ApiError(404, "No placement data found");
    }

    const totalStudents = allStudents.length;
    const totalPlaced = placedStudents.length;
    const totalUnplaced = totalStudents - totalPlaced; // Calculate unplaced students

    const ctcByYear = {};
    const ctcBySpecialization = {};
    const studentCountBySpecialization = {}; // Object to count students by specialization

    placedStudents.forEach((student) => {
      const year = student.year;
      const ctc = student.ctc; // CTC is already a number
      const specialization = student.engineering_specialization;

      // Organize CTC data by year
      if (!ctcByYear[year]) {
        ctcByYear[year] = [];
      }
      ctcByYear[year].push(ctc);

      // Organize CTC data by engineering specialization
      if (!ctcBySpecialization[specialization]) {
        ctcBySpecialization[specialization] = [];
        studentCountBySpecialization[specialization] = 0; // Initialize count for new specialization
      }
      ctcBySpecialization[specialization].push(ctc);
      studentCountBySpecialization[specialization]++; // Increment the count
    });

    // Function to calculate statistics
    const calculateStats = (ctcArray) => {
      if (!ctcArray.length)
        return { mean: 0, median: 0, highest: 0, lowest: 0 };

      const sorted = [...ctcArray].sort((a, b) => a - b);
      const mean =
        sorted.reduce((sum, value) => sum + value, 0) / sorted.length;
      const median =
        sorted.length % 2 === 0
          ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
          : sorted[Math.floor(sorted.length / 2)];
      const highest = Math.max(...sorted);
      const lowest = Math.min(...sorted);

      return { mean, median, highest, lowest };
    };

    // Calculate stats for each year
    const statsByYear = {};
    for (const year in ctcByYear) {
      statsByYear[year] = calculateStats(ctcByYear[year]);
    }

    // Calculate stats for each engineering specialization
    const statsBySpecialization = {};
    for (const specialization in ctcBySpecialization) {
      statsBySpecialization[specialization] = {
        stats: calculateStats(ctcBySpecialization[specialization]),
        numberOfStudents: studentCountBySpecialization[specialization], // Include the count of students
      };
    }

    // Respond with the calculated statistics
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          totalPlaced,
          totalUnplaced,
          totalStudents,
          statsByYear,
          statsBySpecialization,
        },
        "Placement statistics retrieved successfully"
      )
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Error fetching placement statistics",
          error.message
        )
      );
  }
});

export { placementStats };
