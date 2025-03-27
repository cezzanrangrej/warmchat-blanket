
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src: string;
  name: string;
  size?: "sm" | "md" | "lg";
  online?: boolean;
  className?: string;
}

const UserAvatar = ({ 
  src, 
  name, 
  size = "md", 
  online, 
  className 
}: UserAvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };
  
  return (
    <div className={cn("relative rounded-full overflow-hidden", sizeClasses[size], className)}>
      <img 
        src={src} 
        alt={`${name}'s avatar`} 
        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
      />
      
      {online !== undefined && (
        <div 
          className={cn(
            "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white", 
            online ? "bg-green-500" : "bg-gray-400"
          )}
        />
      )}
    </div>
  );
};

export default UserAvatar;
