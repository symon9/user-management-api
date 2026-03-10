const User = require("../models/User");

// Get all users (with optional filtering by role and pagination)
async function getUsers(req, res) {
  try {
    const { role, page, limit } = req.query;

    // Filter by role: if a role is provided in the query string (e.g., ?role=admin), use it; otherwise, return an empty object to find all
    const filter = role ? { role } : {};

    // Pagination setup: default to page 1 and 10 items per page if not provided
    const pageQuery = parseInt(page) || 1;
    const limitQuery = parseInt(limit) || 10;
    // Calculate how many documents to skip to get to the requested page
    const skip = (pageQuery - 1) * limitQuery;

    // Query the database with the filter, then apply skip and limit for pagination
    const users = await User.find(filter).skip(skip).limit(limitQuery);
    
    // Count the total number of documents that match the filter (needed for pagination metadata)
    const total = await User.countDocuments(filter);

    const hasPagination = page || limit;
    const responseData = {
      success: true,
      count: users.length,
      data: users,
    };

    // If the user requested pagination parameters, include the total count and current page in the response
    if (hasPagination) {
      responseData.pagination = { total, page: pageQuery };
    }

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get users sorted by age (youngest to oldest)
async function getUsersSortedByAge(req, res) {
  try {
    // Find all users and sort them by age in ascending order (1 means ascending, -1 means descending)
    const users = await User.find({}).sort({ age: 1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get users stats based on role counts
async function getUserStats(req, res) {
  try {
    // Retrieve all users from the database
    const users = await User.find({});

    // Use Array.reduce to loop through all users and count how many times each role appears
    const stats = users.reduce((acc, user) => {
      // If the role exists in the accumulator, add 1. If it doesn't exist yet, start it at 0 + 1.
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc; // Return the accumulator for the next iteration
    }, {}); // Start with an empty object {}

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get user by ID
async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Create new user
async function addUser(req, res) {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      success: true,
      message: "User created",
      data: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// update user by ID
async function editUser(req, res) {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// delete user by ID
async function removeUser(req, res) {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  getUsers,
  getUsersSortedByAge,
  getUserStats,
  getUser,
  addUser,
  editUser,
  removeUser,
};
