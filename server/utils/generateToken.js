import jwt from "jsonwebtoken";

// JWT token generator
export const generateToken = (userId, res) => {
  try {
    // Sign payload with secret key
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      secure: process.env.NODE || "production", // Send cookie over HTTPS only in production
      sameSite: "None", // Controls cross-site request behavior// 1 day
    });
  } catch (error) {
    console.error("Error generating token:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
