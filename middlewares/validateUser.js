function validateUser(req, res, next) {
  const { name, email, age } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Name must be at least 2 characters",
    });
  }

  if (!email || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Valid email required",
    });
  }

  if (!age || age <= 0) {
    return res.status(400).json({
      success: false,
      message: "Age must be positive",
    });
  }

  if (next) next();
}

module.exports = validateUser;
