import Branch from "../models/branch.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new branch
const createBranch = asyncHandler(async (req, res) => {
  const {
    branch_name,
    number_of_students,
    number_of_placed_students,
    number_of_opt_out_students,
    year,
  } = req.body;

  // Validate input fields
  if (
    [
      branch_name,
      number_of_students,
      number_of_placed_students,
      number_of_opt_out_students,
      year,
    ].some((field) => field == null)
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if a branch with the given name and year already exists
  const existingBranch = await Branch.findOne({ branch_name, year });

  if (existingBranch) {
    throw new ApiError(409, "Branch already exists for the given year");
  }

  const branch = new Branch({
    branch_name,
    number_of_students,
    number_of_placed_students,
    number_of_opt_out_students,
    year,
  });

  await branch.save();

  res
    .status(201)
    .json(new ApiResponse(201, branch, "Branch created successfully"));
});

// Get all branches
const getAllBranches = asyncHandler(async (req, res) => {
  const branches = await Branch.find();

  res
    .status(200)
    .json(new ApiResponse(200, branches, "Branches fetched successfully"));
});

// Get a branch by ID
const getBranchById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const branch = await Branch.findById(id);

  if (!branch) {
    throw new ApiError(404, "Branch not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, branch, "Branch fetched successfully"));
});

// Update a branch by ID
const updateBranch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    branch_name,
    number_of_students,
    number_of_placed_students,
    number_of_opt_out_students,
    year,
  } = req.body;

  const branch = await Branch.findById(id);

  if (!branch) {
    throw new ApiError(404, "Branch not found");
  }

  if (branch_name) branch.branch_name = branch_name;
  if (number_of_students != null)
    branch.number_of_students = number_of_students;
  if (number_of_placed_students != null)
    branch.number_of_placed_students = number_of_placed_students;
  if (number_of_opt_out_students != null)
    branch.number_of_opt_out_students = number_of_opt_out_students;
  if (year) branch.year = year;

  await branch.save();

  res
    .status(200)
    .json(new ApiResponse(200, branch, "Branch updated successfully"));
});

// Delete a branch by ID
const deleteBranch = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const branch = await Branch.findByIdAndDelete(id);

  if (!branch) {
    throw new ApiError(404, "Branch not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Branch deleted successfully"));
});

export {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};
