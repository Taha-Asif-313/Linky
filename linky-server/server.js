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

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes setup
app.use("/api/auth", userRoute);
app.use("/api/message", messageRoute);

// Create the HTTP server using the Express app
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
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
 
server.listen(PORT,() => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export const getReceiverSocketId = (receiverId) => {
  return onlineUsers[receiverId];
};

export default app; // Export the app for Vercel deployment
