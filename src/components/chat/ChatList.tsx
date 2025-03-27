
import { useState } from "react";
import { formatDate, formatTime, useChat } from "@/utils/data.tsx";
import UserAvatar from "@/components/ui/UserAvatar";
import { UsersRound } from "lucide-react";

const ChatList = () => {
  const { chats, setCurrentChat, currentChat } = useChat();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = searchQuery 
    ? chats.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.messages.some(msg => 
          msg.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : chats;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-secondary/70 to-secondary/30">
      <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-white/80 border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
            <p>No conversations found</p>
          </div>
        ) : (
          <ul className="divide-y divide-primary/5">
            {filteredChats.map((chat) => {
              const lastMessage = chat.messages[chat.messages.length - 1];
              const isActive = currentChat?.id === chat.id;
              
              return (
                <li 
                  key={chat.id}
                  onClick={() => setCurrentChat(chat)}
                  className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isActive 
                      ? "bg-gradient-to-r from-primary/20 to-accent/10 hover:from-primary/25 hover:to-accent/15" 
                      : "hover:bg-white/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {chat.isGroup ? (
                      <div className="relative">
                        <div className="flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 rounded-full h-10 w-10 shadow-sm">
                          <UsersRound size={18} className="text-primary" />
                        </div>
                      </div>
                    ) : (
                      <UserAvatar
                        src={chat.participants.find(p => p.id !== "user1")?.avatar || ""}
                        name={chat.name}
                        online={chat.participants.find(p => p.id !== "user1")?.online}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className={`font-medium truncate ${isActive ? "text-primary" : ""}`}>{chat.name}</h3>
                        {lastMessage && (
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {formatTime(lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-baseline mt-1">
                        {lastMessage && (
                          <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                            {lastMessage.sender === "user1" ? "You: " : ""}
                            {lastMessage.mediaType ? `[${lastMessage.mediaType}] ` : ""}
                            {lastMessage.content}
                          </p>
                        )}
                        {chat.unread > 0 && (
                          <span className="ml-2 bg-gradient-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 shadow-sm animate-pulse-soft">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatList;
