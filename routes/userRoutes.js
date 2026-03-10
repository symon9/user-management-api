const express = require("express");
const router = express.Router();

const { getUsers, getUser, addUser, editUser, removeUser } = require("../controllers/userController");

const validateUser = require("../middlewares/validateUser");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", validateUser, addUser);
router.put("/:id", editUser);
router.delete("/:id", removeUser);

module.exports = router;
