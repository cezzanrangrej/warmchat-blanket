
import { createContext, useContext, useState } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  avatar: string;
  online?: boolean;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  read: boolean;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio' | 'document';
}

export interface Chat {
  id: string;
  name: string;
  participants: User[];
  isGroup: boolean;
  lastMessage?: Message;
  unread: number;
  messages: Message[];
}

// Sample Data
export const users: User[] = [
  {
    id: "user1",
    name: "You",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    online: true
  },
  {
    id: "user2",
    name: "Alex Kim",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    online: true
  },
  {
    id: "user3",
    name: "Taylor Morgan",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    online: false
  },
  {
    id: "user4",
    name: "Jordan Lee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    online: true
  },
  {
    id: "user5",
    name: "Casey Chen",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    online: false
  }
];

const initialChats: Chat[] = [
  {
    id: "chat1",
    name: "Alex Kim",
    participants: [users[0], users[1]],
    isGroup: false,
    unread: 2,
    messages: [
      {
        id: "msg1",
        sender: "user2",
        content: "Hey, how's the project coming along?",
        timestamp: new Date(Date.now() - 3600000 * 24),
        read: true
      },
      {
        id: "msg2",
        sender: "user1",
        content: "Great! I'm just finalizing the design system. Should be ready by tomorrow.",
        timestamp: new Date(Date.now() - 3600000 * 23),
        read: true
      },
      {
        id: "msg3",
        sender: "user2",
        content: "Perfect! Looking forward to seeing it. Do you have time for a quick call later?",
        timestamp: new Date(Date.now() - 3600000 * 2),
        read: false
      }
    ]
  },
  {
    id: "chat2",
    name: "Design Team",
    participants: [users[0], users[1], users[2], users[3]],
    isGroup: true,
    unread: 5,
    messages: [
      {
        id: "msg4",
        sender: "user3",
        content: "I've updated the wireframes for the new homepage.",
        timestamp: new Date(Date.now() - 3600000 * 48),
        read: true
      },
      {
        id: "msg5",
        sender: "user4",
        content: "They look amazing! I especially like the new navigation concept.",
        timestamp: new Date(Date.now() - 3600000 * 47),
        read: true,
      },
      {
        id: "msg6",
        sender: "user2",
        content: "Agreed! When can we start implementing this?",
        timestamp: new Date(Date.now() - 3600000 * 1),
        read: false,
      },
      {
        id: "msg7",
        sender: "user3",
        content: "I think we could start next week after the client meeting.",
        timestamp: new Date(Date.now() - 3600000 * 0.5),
        read: false,
        mediaUrl: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2lyZWZyYW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        mediaType: "image"
      }
    ]
  },
  {
    id: "chat3",
    name: "Taylor Morgan",
    participants: [users[0], users[2]],
    isGroup: false,
    unread: 0,
    messages: [
      {
        id: "msg8",
        sender: "user1",
        content: "Hey Taylor, did you get a chance to review the user research?",
        timestamp: new Date(Date.now() - 3600000 * 72),
        read: true
      },
      {
        id: "msg9",
        sender: "user3",
        content: "Yes, I did! I've compiled some interesting insights. Let me share them with you.",
        timestamp: new Date(Date.now() - 3600000 * 71),
        read: true
      },
      {
        id: "msg10",
        sender: "user1",
        content: "That would be great, thanks!",
        timestamp: new Date(Date.now() - 3600000 * 70),
        read: true
      }
    ]
  },
  {
    id: "chat4",
    name: "Jordan Lee",
    participants: [users[0], users[3]],
    isGroup: false,
    unread: 0,
    messages: [
      {
        id: "msg11",
        sender: "user4",
        content: "Hey, just wanted to check if we're still on for the brainstorming session tomorrow?",
        timestamp: new Date(Date.now() - 3600000 * 26),
        read: true
      },
      {
        id: "msg12",
        sender: "user1",
        content: "Absolutely! I've prepared some initial ideas we can discuss.",
        timestamp: new Date(Date.now() - 3600000 * 25),
        read: true
      },
      {
        id: "msg13",
        sender: "user4",
        content: "Great! Looking forward to it. Let's meet at 10 AM?",
        timestamp: new Date(Date.now() - 3600000 * 24),
        read: true
      },
      {
        id: "msg14",
        sender: "user1",
        content: "10 AM works for me. See you then!",
        timestamp: new Date(Date.now() - 3600000 * 23),
        read: true
      }
    ]
  },
  {
    id: "chat5",
    name: "Casey Chen",
    participants: [users[0], users[4]],
    isGroup: false,
    unread: 0,
    messages: [
      {
        id: "msg15",
        sender: "user5",
        content: "Hi there! I just wanted to introduce myself. I'm Casey, the new UX designer joining the team next week.",
        timestamp: new Date(Date.now() - 3600000 * 10),
        read: true
      },
      {
        id: "msg16",
        sender: "user1",
        content: "Welcome Casey! It's great to meet you. I've heard amazing things about your work.",
        timestamp: new Date(Date.now() - 3600000 * 9),
        read: true
      },
      {
        id: "msg17",
        sender: "user5",
        content: "Thank you! I'm excited to be joining such a talented team. I've been following your work for a while.",
        timestamp: new Date(Date.now() - 3600000 * 8),
        read: true
      }
    ]
  }
];

// Context for chat data
interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  setCurrentChat: (chat: Chat | null) => void;
  sendMessage: (content: string, mediaUrl?: string, mediaType?: 'image' | 'video' | 'audio' | 'document') => void;
  currentUser: User;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const currentUser = users[0]; // Current user is always the first user in the array

  const sendMessage = (content: string, mediaUrl?: string, mediaType?: 'image' | 'video' | 'audio' | 'document') => {
    if (!currentChat) return;

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      sender: currentUser.id,
      content,
      timestamp: new Date(),
      read: false,
      mediaUrl,
      mediaType
    };

    const updatedChats = chats.map(chat => {
      if (chat.id === currentChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: newMessage
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setCurrentChat(updatedChats.find(c => c.id === currentChat.id) || null);
  };

  return (
    <ChatContext.Provider value={{ chats, currentChat, setCurrentChat, sendMessage, currentUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Helper functions
export const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

export const formatDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  }
};
