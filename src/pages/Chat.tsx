
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useChat } from "@/utils/data";
import Conversation from "@/components/chat/Conversation";
import Header from "@/components/layout/Header";

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const { chats, setCurrentChat } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const chat = chats.find(c => c.id === id);
      if (chat) {
        setCurrentChat(chat);
      } else {
        navigate("/");
      }
    }
  }, [id, chats, setCurrentChat, navigate]);

  return (
    <div className="h-full flex flex-col">
      <Conversation isMobile={true} />
    </div>
  );
};

export default Chat;
