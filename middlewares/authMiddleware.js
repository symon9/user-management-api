const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1. Get the token from the Authorization header (e.g. "Bearer <token>")
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Access Denied. No token provided.",
    });
  }

  // 2. Extract the token part
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the decoded payload (user info) to the request object
    req.user = decoded;

    // 5. Move to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;
