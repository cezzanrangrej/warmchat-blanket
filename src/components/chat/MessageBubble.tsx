
import { Message, formatTime, User } from "@/utils/data";
import UserAvatar from "@/components/ui/UserAvatar";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
  sender: User;
  isCurrentUser: boolean;
  showAvatar?: boolean;
}

const MessageBubble = ({ message, sender, isCurrentUser, showAvatar = true }: MessageBubbleProps) => {
  const { content, timestamp, mediaUrl, mediaType } = message;

  const renderMedia = () => {
    if (!mediaUrl) return null;

    switch (mediaType) {
      case "image":
        return (
          <div className="mt-2 rounded-lg overflow-hidden">
            <img 
              src={mediaUrl} 
              alt="Shared image" 
              className="max-w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
              loading="lazy"
            />
          </div>
        );
      case "video":
        return (
          <div className="mt-2 rounded-lg overflow-hidden">
            <video 
              src={mediaUrl}
              controls
              className="max-w-full h-auto"
            />
          </div>
        );
      case "audio":
        return (
          <div className="mt-2 p-2 bg-white/50 backdrop-blur-sm rounded-lg">
            <audio src={mediaUrl} controls className="w-full" />
          </div>
        );
      case "document":
        return (
          <div className="mt-2 p-3 bg-white/50 backdrop-blur-sm rounded-lg flex items-center gap-2 hover:bg-white/70 transition-colors cursor-pointer">
            <div className="p-2 bg-primary/10 rounded">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">Document.pdf</p>
              <p className="text-xs text-muted-foreground">2.4 MB</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "flex items-end gap-2 mb-4 group",
      isCurrentUser ? "justify-end" : "justify-start"
    )}>
      {!isCurrentUser && showAvatar && (
        <UserAvatar
          src={sender.avatar}
          name={sender.name}
          size="sm"
          className="mb-1 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}
      
      <div className={cn(
        "flex flex-col",
        isCurrentUser ? "items-end" : "items-start"
      )}>
        <div 
          className={cn(
            isCurrentUser ? "chat-bubble-sent" : "chat-bubble-received"
          )}
        >
          {content}
          {renderMedia()}
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {formatTime(timestamp)}
        </span>
      </div>
      
      {isCurrentUser && showAvatar && (
        <UserAvatar
          src={sender.avatar}
          name={sender.name}
          size="sm"
          className="mb-1 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}
    </div>
  );
};

export default MessageBubble;
