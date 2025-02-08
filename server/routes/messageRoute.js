import { Router } from "express";
import {
  getConversation,
  getUserConversations,
  sendMessage,
} from "../controllers/messageController.js";
import isLogin from "../middlewares/isLogin.js";

const router = Router();

router.post("/send-message/:id", isLogin, sendMessage);
router.get("/get-conversation/:id", isLogin, getConversation);
router.get("/user-conversations", isLogin, getUserConversations);

export default router;
