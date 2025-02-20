import jwt from "jsonwebtoken";

// JWT token generator
export const generateToken = (userId, res) => {
  try {
    // Sign payload with secret key
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    return token
  } catch (error) {
    console.error("Error generating token:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
