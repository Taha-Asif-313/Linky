// import User from "../model/User";
import Conversation from "../model/Conversation.js";
import Message from "../model/Message.js";
import { getReceiverSocketId, io } from "../server.js";

const sendMessage = async (req, res) => {
  try {
    // Get sender ID from authentication middleware
    const senderId = req.user.id;

    // Get receiver ID from request parameters
    const receiverId = req.params.id;

    // Get message content from request body
    const { message } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message content is required.",
      });
    }

    // Create new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();

    // Populate sender details in the message
    const findNewMessage = await Message.findById(newMessage._id)
      // .populate("senderId", "username email") // Adjust fields as needed
      .select("message senderId createdAt");

    // Socket.io: Send message to receiver if online
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", findNewMessage);
      console.log(
        `Message sent to user ${receiverId} (Socket ID: ${receiverSocketId})`
      );
    } else {
      console.log(`User ${receiverId} is offline, message saved.`);
    }

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      newMessage: findNewMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getConversation = async (req, res) => {
  try {
    // Get SenderId from middleware
    const senderId = req.user.id;

    // receiverId from params
    const receiverId = req.params.id;

    // Mark unread messages from receiver as read
    await Message.updateMany(
      { senderId: receiverId, receiverId: senderId, read: false },
      { $set: { read: true } }
    );

    // Get Conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages", "message senderId");

    return res
      .status(200)
      .json({ conversationMessages: conversation.messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getUserConversations = async (req, res) => {
  try {
    const senderId = req.user.id;

    // Retrieve all conversations for the authenticated user
    let conversations = await Conversation.find({
      participants: senderId,
    })
      .populate("participants", "fullname username profilePic")
      .populate({
        path: "messages",
        select: "message senderId receiverId read createdAt",
      });

    // Format conversation with receiver info and unread count
    const formatted = conversations.map((conversation) => {
      // Identify the receiver (other participant)
      const receiver = conversation.participants.find(
        (participant) => participant._id.toString() !== senderId
      );

      // Count unread messages sent *to* the logged-in user (receiverId === senderId)
      const unreadCount = conversation.messages.filter(
        (msg) => msg.receiverId.toString() === senderId && msg.read === false
      ).length;

      return {
        user: receiver,
        unreadCount,
      };
    });

    return res.json({
      success: true,
      conversations: formatted,
    });
  } catch (error) {
    console.error("Error in getUserConversations:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteChat = async (req, res) => {
  try {
    const userId = req.user.id; // Logged-in user
    const receiverId = req.params.id; // Receiver ID from params

    // Delete all messages between these two users
    await Message.deleteMany({
      senderId: { $in: [userId, receiverId] },
      receiverId: { $in: [userId, receiverId] },
    });

    // Remove conversation from the database
    await Conversation.findOneAndDelete({
      participants: { $all: [userId, receiverId] },
    });

    // Emit event to update UI in real-time
    io.emit("deleteChat", { senderId: userId, receiverId });

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteMessage = async (req, res) => {};

export { sendMessage, getConversation, getUserConversations, deleteChat };
