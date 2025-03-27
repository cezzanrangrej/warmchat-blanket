
import { useState } from "react";
import { Search, PlusCircle, Settings, Menu } from "lucide-react";
import { useChat } from "@/utils/data";
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
    <header className="border-b p-4 flex items-center gap-4 bg-white/80 backdrop-blur-md z-10">
      {showBackButton ? (
        <button 
          onClick={onBack} 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
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
          className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
      )}

      {title ? (
        <div className="flex-1">
          <h1 className="text-lg font-medium">{title}</h1>
        </div>
      ) : (
        <div className={`flex-1 transition-all duration-300 ${isSearchActive ? 'flex' : 'hidden md:flex'}`}>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search messages"
              className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        {!isSearchActive && (
          <>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden sm:flex"
              aria-label="Create new chat"
            >
              <PlusCircle size={20} />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden sm:flex"
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
