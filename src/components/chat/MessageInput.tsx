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
    <div className="p-4 bg-background border-t">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button 
          type="button" 
          className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-secondary"
          aria-label="Attach a file"
        >
          <Paperclip size={20} />
        </button>
        <button 
          type="button" 
          className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-secondary"
          aria-label="Share an image"
        >
          <Image size={20} />
        </button>
        <button 
          type="button" 
          className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-secondary"
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
            className="chat-input pr-10"
          />
          <button 
            type="button" 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Add emoji"
          >
            <Smile size={20} />
          </button>
        </div>
        <button 
          type="submit" 
          className={`p-3 rounded-full flex items-center justify-center transition-all duration-200 ${
            message.trim() 
              ? "bg-primary text-white hover:bg-primary/90" 
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
