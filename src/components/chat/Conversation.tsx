
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { User, useChat } from "@/utils/data";
import Header from "../layout/Header";
import { useNavigate } from "react-router-dom";

interface ConversationProps {
  isMobile?: boolean;
}

const Conversation = ({ isMobile }: ConversationProps) => {
  const { currentChat, currentUser } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages]);

  if (!currentChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-chat-pattern">
        <div className="text-center animate-fade-in">
          <div className="mb-6 p-6 rounded-full bg-primary/5 inline-flex">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium mb-2">Welcome to Messages</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Select a conversation or start a new one to begin messaging
          </p>
        </div>
      </div>
    );
  }

  // Get other participants (exclude current user)
  const otherParticipants = currentChat.participants.filter(
    (p) => p.id !== currentUser.id
  );

  // Function to determine if we should show sender avatar
  // Show avatar only for first message in a sequence from same sender
  const shouldShowAvatar = (index: number, senderId: string) => {
    if (index === 0) return true;
    const prevMessage = currentChat.messages[index - 1];
    return prevMessage.sender !== senderId;
  };

  // Get sender details for a message
  const getSender = (senderId: string): User => {
    return (
      currentChat.participants.find((p) => p.id === senderId) || currentUser
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {isMobile && (
        <Header 
          showBackButton
          title={currentChat.name}
          onBack={() => navigate("/")}
        />
      )}
      <div className="flex-1 overflow-y-auto p-4 bg-chat-pattern">
        <div className="max-w-3xl mx-auto">
          {currentChat.messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              sender={getSender(message.sender)}
              isCurrentUser={message.sender === currentUser.id}
              showAvatar={shouldShowAvatar(index, message.sender)}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <MessageInput />
    </div>
  );
};

export default Conversation;
