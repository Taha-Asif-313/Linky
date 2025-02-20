import User from "../model/User.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";

// Register User
const signup = async (req, res) => {
  try {
    // Get data from user
    const { fullname, username, email, password, confirmPassword } = req.body;

    // Check if user with this username exist or not
    const isUsername = await User.findOne({ username: username });
    if (isUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists!",
      });
    }

    // Check if user with this email exist or not
    const isEmail = await User.findOne({ email: email });
    if (isEmail) {
      return res.status(400).json({
        success: false,
        message: "Try another email!",
      });
    }

    // Check password and confirmPassword same or different
    if (password !== confirmPassword) {
      return res.status(404).json({
        success: false,
        message: "Password did not matched!",
      });
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save User
    const user = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      profilePic: "https://avatar.iran.liara.run/public/boy",
    });
    await user.save();

    // Response
    return res.status(201).json({
      success: true,
      message: "Registered Successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login User
const login = async (req, res) => {
  try {
    // Get data
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    // Email or username matching
    if (!user) {
      return res.json({
        success: false,
        message: "invalid candidate!",
      });
    }

    // Password Matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "invalid candidate!",
      });
    }

    // JWT Token
    const authToken = generateToken(user._id, res);

    // Responce
    return res.status(200).json({
      success: true,
      message: "Login Successfully!",
      user: await User.findById(user._id).select("-password"),
      authToken : authToken
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "internal server error !",
      error: error.message,
    });
  }
};

// Find Users
const findUsers = async (req, res) => {
  try {
    // Exclude the logged-in user from the query result
    const allUsers = await User.find({ _id: { $ne: req.user.id } });

    return res.status(200).json({
      success: true,
      users: allUsers, // Return the list of users excluding the logged-in user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message, // Optional: Return the actual error message for debugging
    });
  }
};

// Search Users
const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    // Find users whose username or fullname matches the search query
    const users = await User.find(
      {
        username: { $regex: query, $options: "i" }, // Search for usernames containing the query
        _id: { $ne: req.user.id }, // Exclude the logged-in user
      },
      { username: 1, profilePic: 1, _id: 1 }
    );

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// Logout User
const logout = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true, // Prevent JavaScript access (security)
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "None", // Allow cross-site cookies for authentication
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      success: false,
      message: "internal server error!",
      error: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    // Get data
    const { fullname } = req.body;
    // Email or username matching
    await User.findByIdAndUpdate(req.user.id, {fullname: fullname });
    // Responce
    return res.status(200).json({
      success: true,
      message: "Update Successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "internal server error !",
      error: error.message,
    });
  }
};

export { signup, login, logout, findUsers, searchUsers, updateUser };
