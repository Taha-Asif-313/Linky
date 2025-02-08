import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import connectDb from "./config/connectDb.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";

// Create an Express app
const app = express();

// Connect to the database
connectDb();

// Middleware setup
app.use(
  cors({
    origin: ["https://letslinkylink.netlify.app", "http://localhost:3000"], // Frontend URL
    credentials: true, // Required if you're working with cookies or sessions
  })
);
app.options('*', cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes setup
app.use("/api/auth", userRoute);
app.use("/api/message", messageRoute);

// Serve static files from the React app

// Implement Socket.io

// Create the HTTP server using the Express app
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "https://letslinkylink.netlify.app", // Frontend origin
    methods: ["GET", "POST", "PUT"], // Allowed methods
    credentials: true, // To support cookies or headers with credentials
  },
});

const onlineUsers = {}; // Define onlineUsers object

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  onlineUsers[userId] = socket.id; // Store userId and socket.id in onlineUsers object

  io.emit("getOnlineUser", Object.keys(onlineUsers));
  console.log(onlineUsers);

  socket.on("disconnect", () => {
    delete onlineUsers[userId]; // Correct way to remove the user from onlineUsers object
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export const getReceiverSocketId = (receiverId) => {
  return onlineUsers[receiverId];
};

export default app; // Export the app for Vercel deployment
