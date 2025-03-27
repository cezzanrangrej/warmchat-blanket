
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChatProvider, useChat } from "@/utils/data";
import ChatList from "@/components/chat/ChatList";
import Conversation from "@/components/chat/Conversation";
import Header from "@/components/layout/Header";
import { useIsMobile } from "@/hooks/use-mobile";

const ChatLayout = () => {
  const { currentChat } = useChat();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // On mobile, navigate to chat page when a chat is selected
  useEffect(() => {
    if (isMobile && currentChat && location.pathname === "/") {
      navigate(`/chat/${currentChat.id}`);
    }
  }, [currentChat, isMobile, navigate, location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-full flex flex-col">
      {!isMobile && <Header toggleSidebar={toggleSidebar} />}
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - always visible on desktop, hidden on mobile */}
        <div 
          className={`${
            isMobile ? 'hidden' : (sidebarOpen ? 'w-80' : 'w-0 opacity-0')
          } transition-all duration-300 border-r overflow-hidden`}
        >
          <ChatList />
        </div>
        
        {/* Main content - conversation or placeholder */}
        <div className="flex-1 flex flex-col">
          <Conversation />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <ChatProvider>
      <ChatLayout />
    </ChatProvider>
  );
};

export default Index;
