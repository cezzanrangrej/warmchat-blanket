
import { useState } from "react";
import { Paperclip, Image, Mic, Send, Smile } from "lucide-react";
import { useChat } from "@/utils/data.tsx";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useChat();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-secondary to-secondary/50 backdrop-blur-sm border-t border-primary/10">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button 
          type="button" 
          className="text-primary hover:text-accent transition-colors p-2 rounded-full hover:bg-white/30 backdrop-blur-sm"
          aria-label="Attach a file"
        >
          <Paperclip size={20} />
        </button>
        <button 
          type="button" 
          className="text-primary hover:text-accent transition-colors p-2 rounded-full hover:bg-white/30 backdrop-blur-sm"
          aria-label="Share an image"
        >
          <Image size={20} />
        </button>
        <button 
          type="button" 
          className="text-primary hover:text-accent transition-colors p-2 rounded-full hover:bg-white/30 backdrop-blur-sm"
          aria-label="Record audio"
        >
          <Mic size={20} />
        </button>
        <div className="relative flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="chat-input pr-10 shadow-md focus:shadow-lg"
          />
          <button 
            type="button" 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-accent transition-colors"
            aria-label="Add emoji"
          >
            <Smile size={20} />
          </button>
        </div>
        <button 
          type="submit" 
          className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
            message.trim() 
              ? "bg-gradient-primary text-white vibrant-shadow hover:opacity-90 animate-pulse-glow" 
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          aria-label="Send message"
          disabled={!message.trim()}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
