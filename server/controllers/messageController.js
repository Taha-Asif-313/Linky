// import User from "../model/User";
import Conversation from "../model/Conversation.js";
import Message from "../model/Message.js";
import { getReceiverSocketId, io } from "../server.js";

const sendMessage = async (req, res) => {
  try {
    // Get SenderId from middleware
    const senderId = req.user.id;

    // receiverId from params
    const receiverId = req.params.id;

    // Get message from req.body
    const { message } = req.body;

    // Generate new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    await newMessage.save();

    // Check if a conversation between the sender and receiver already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // If no conversation exists, create a new one
      conversation = new Conversation({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
      });
    }

    // If conversation exists, just add the message to it
    conversation.messages.push(newMessage._id);
    await conversation.save();

    let conversationMessages = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages", "message senderId");

    // Socket Io
    const receiverSocketId = getReceiverSocketId(receiverId);
    io.to(receiverSocketId).emit("sendMessage", conversationMessages.messages);
    console.log(receiverSocketId);

    // Return a response
    return res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      newMessage: newMessage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getConversation = async (req, res) => {
  try {
    // Get SenderId from middleware
    const senderId = req.user.id;

    // receiverId from params
    const receiverId = req.params.id;

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
    // Get SenderId from middleware
    const senderId = req.user.id;

    // Retrieve all conversations for the authenticated user
    let conversations = await Conversation.find({
      participants: senderId,
    }).populate("participants", "fullname username profilePic");

    // Extract receiver IDs
    const receiverIds = conversations.map((conversation) => {
      return conversation.participants.find(
        (participant) => participant._id.toString() !== senderId
      );
    });

    return res.json({
      success: true,
      receiverIds,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteMessage = async (req, res) => {};

export { sendMessage, getConversation, getUserConversations };
