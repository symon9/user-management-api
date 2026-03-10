const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUsersSortedByAge,
  getUserStats,
  getUser,
  addUser,
  editUser,
  removeUser,
} = require("../controllers/userController");

const validateUser = require("../middlewares/validateUser");
const authMiddleware = require("../middlewares/authMiddleware");

// Apply authMiddleware to all routes below it
router.use(authMiddleware);

router.get("/", getUsers);
router.get("/sorted/by-age", getUsersSortedByAge);
router.get("/stats/count", getUserStats);
router.get("/:id", getUser);
router.post("/", validateUser, addUser);
router.put("/:id", editUser);
router.delete("/:id", removeUser);

module.exports = router;
