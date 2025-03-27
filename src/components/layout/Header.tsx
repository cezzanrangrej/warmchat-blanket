
import { useState } from "react";
import { Search, PlusCircle, Settings, Menu } from "lucide-react";
import { useChat } from "@/utils/data.tsx";
import UserAvatar from "@/components/ui/UserAvatar";

interface HeaderProps {
  toggleSidebar?: () => void;
  showBackButton?: boolean;
  title?: string;
  onBack?: () => void;
}

const Header = ({ toggleSidebar, showBackButton, title, onBack }: HeaderProps) => {
  const { currentUser } = useChat();
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header className="border-b border-white/10 p-4 flex items-center gap-4 bg-gradient-to-r from-secondary/80 to-secondary/60 backdrop-blur-md z-10 shadow-md">
      {showBackButton ? (
        <button 
          onClick={onBack} 
          className="p-2 rounded-full dark-glass hover:bg-white/20 text-primary hover:text-accent transition-colors shadow-md"
          aria-label="Go back"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      ) : (
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden p-2 rounded-full dark-glass hover:bg-white/20 text-primary hover:text-accent transition-colors shadow-md"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
      )}

      {title ? (
        <div className="flex-1">
          <h1 className="text-lg font-medium text-gradient">{title}</h1>
        </div>
      ) : (
        <div className={`flex-1 transition-all duration-300 ${isSearchActive ? 'flex' : 'hidden md:flex'}`}>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search messages"
              className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/60 focus:bg-muted border border-white/10 focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all shadow-md text-foreground"
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}
            />
            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        {!isSearchActive && (
          <>
            <button 
              className="p-2 rounded-full dark-glass hover:bg-white/20 text-primary hover:text-accent transition-colors hidden sm:flex shadow-md"
              aria-label="Create new chat"
            >
              <PlusCircle size={20} />
            </button>
            <button 
              className="p-2 rounded-full dark-glass hover:bg-white/20 text-primary hover:text-accent transition-colors hidden sm:flex shadow-md"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </>
        )}
        <UserAvatar 
          src={currentUser.avatar}
          name={currentUser.name}
          size="sm"
          online={currentUser.online}
        />
      </div>
    </header>
  );
};

export default Header;
