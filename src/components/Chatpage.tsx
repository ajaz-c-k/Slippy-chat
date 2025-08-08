// import { useState, useRef, useEffect } from "react";
// import { io, Socket } from "socket.io-client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { UserList } from "./UserList";
// import { ChatMessage } from "./ChatMessage";
// import { Send } from "lucide-react";

// export interface User {
//   id: string;
//   username: string;
//   avatar: string;
//   online: boolean;
// }

// export interface Message {
//   id: string;
//   username: string;
//   avatar: string;
//   content: string;
//   timestamp: Date;
//   isSlippyFake?: boolean;
// }

// interface ChatPageProps {
//   currentUser: User;
//   onLogout: () => void;
// }

// export const ChatPage = ({ currentUser, onLogout }: ChatPageProps) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const socketRef = useRef<Socket | null>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     const socket = io("http://192.168.10.57:5000", {
//       transports: ["websocket"],
//     });
//     socketRef.current = socket;

//     // Join the chat
//     socket.emit("join", {
//       username: currentUser.username,
//       avatar: currentUser.avatar,
//     });

//     // Updated user list
//     socket.on("users", (userList: any[]) => {
//       const mapped: User[] = userList.map((u) => ({
//         id: u.id || u.username,
//         username: u.username,
//         avatar: u.avatar || "🙂",
//         online: true,
//       }));
//       setUsers(mapped);
//     });

//     // New incoming message
//     socket.on("chat", (data: any) => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now().toString(),
//           username: data.username,
//           avatar: data.avatar || "🙂",
//           content: data.content,
//           timestamp: new Date(),
//           isSlippyFake:
//             data.username?.toLowerCase().includes("slippy") ||
//             data.content?.toLowerCase().includes("slippy meddled"),
//         },
//       ]);
//     });

//     // Mark user offline
//     socket.on("user_left", (userId: string) => {
//       setUsers((prev) =>
//         prev.map((u) =>
//           u.id === userId ? { ...u, online: false } : u
//         )
//       );
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [currentUser]);

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     socketRef.current?.emit("send", {
//       username: currentUser.username,
//       avatar: currentUser.avatar,
//       content: newMessage.trim(),
//     });

//     setNewMessage("");
//   };

//   return (
//     <div className="h-screen bg-gradient-chat flex">
//       {/* User List */}
//       <div className="w-1/4 border-r border-border bg-card/50 backdrop-blur-sm">
//         <UserList
//           users={users}
//           currentUserName={currentUser.username} // ✅ correct variable
//           onLogout={onLogout}
//         />
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
//           <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//             Slippy Chat Room
//           </h2>
//           <p className="text-sm text-muted-foreground">
//             {users.filter((u) => u.online).length} users online • Slippy is watching 👁
//           </p>
//         </div>

//         {/* Messages */}
//         <ScrollArea className="flex-1 p-4">
//           <div className="space-y-4">
//             {messages.map((message) => (
//               <ChatMessage
//                 key={message.id}
//                 message={message}
//                 isOwn={message.username === currentUser.username}
//               />
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </ScrollArea>

//         {/* Input */}
//         <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
//           <form onSubmit={handleSendMessage} className="flex gap-2">
//             <Input
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1"
//               maxLength={200}
//             />
//             <Button
//               type="submit"
//               disabled={!newMessage.trim()}
//               size="icon"
//             >
//               <Send className="h-4 w-4" />
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserList } from "./UserList";
import { ChatMessage } from "./ChatMessage";
import { Send } from "lucide-react"; // Import the Send icon

// Interface for a user object
export interface User {
  id: string;
  username: string;
  avatar: string;
  online: boolean;
}

// Interface for a message object
export interface Message {
  id: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: Date;
  isSlippyFake?: boolean; // Optional flag for messages from the "Slippy bot"
}

// Props for the ChatPage component
interface ChatPageProps {
  currentUser: User;
  onLogout: () => void;
}

export const ChatPage = ({ currentUser, onLogout }: ChatPageProps) => {
  // State to store all chat messages
  const [messages, setMessages] = useState<Message[]>([]);
  // State to store the list of online users
  const [users, setUsers] = useState<User[]>([]);
  // State for the new message being typed by the user
  const [newMessage, setNewMessage] = useState("");
  // Ref for auto-scrolling to the bottom of the messages
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Ref to hold the Socket.IO client instance
  const socketRef = useRef<Socket | null>(null);

  // Effect to scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to scroll the chat area to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect for handling Socket.IO connections and events
  useEffect(() => {
    // Initialize Socket.IO connection
    const socket = io("http://192.168.10.57:5000", {
      transports: ["websocket"], // Force websocket transport
    });
    socketRef.current = socket; // Store socket instance in ref

    // Emit 'join' event when component mounts, sending current user info
    socket.emit("join", {
      username: currentUser.username,
      avatar: currentUser.avatar,
    });

    // Listener for 'users' event to update the user list
    socket.on("users", (userList: any[]) => {
      // Map raw user data to User interface format
      const mapped: User[] = userList.map((u) => ({
        id: u.id || u.username, // Use id if available, fallback to username
        username: u.username,
        avatar: u.avatar || "🙂", // Default avatar if not provided
        online: true, // All users in this list are online
      }));
      setUsers(mapped); // Update users state
    });

    // Listener for 'chat' event for new incoming messages
    socket.on("chat", (data: any) => {
      setMessages((prev) => [
        ...prev, // Keep previous messages
        {
          id: Date.now().toString(), // Unique ID for the message
          username: data.username,
          avatar: data.avatar || "🙂",
          content: data.content,
          timestamp: new Date(), // Current timestamp
          // Determine if the message is from the "Slippy bot"
          isSlippyFake:
            data.username?.toLowerCase().includes("slippy") ||
            data.content?.toLowerCase().includes("slippy meddled"),
        },
      ]);
    });

    // Listener for 'user_left' event to mark a user as offline
    socket.on("user_left", (userId: string) => {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, online: false } : u // Mark user offline
        )
      );
    });

    // Cleanup function: disconnect socket when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [currentUser]); // Re-run effect if currentUser changes

  // Handler for sending messages
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (!newMessage.trim()) return; // Don't send empty messages

    // Emit 'send' event with message content
    socketRef.current?.emit("send", {
      username: currentUser.username,
      avatar: currentUser.avatar,
      content: newMessage.trim(),
    });

    setNewMessage(""); // Clear the input field after sending
  };

  return (
    // Main chat page container with background gradient
    <div className="h-screen bg-gradient-background flex text-foreground"> {/* Changed to bg-gradient-background to use CSS variable */}
      {/* User List Sidebar */}
      <div className="w-1/4 border-r border-border bg-card/50 backdrop-blur-sm">
        <UserList
          users={users}
          currentUserName={currentUser.username}
          onLogout={onLogout}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
          {/* Chat Room Title - uses font-press-start */}
          <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent font-press-start">
            Slippy Chat Room
          </h2>
          {/* User count and Slippy status - uses font-press-start */}
          <p className="text-xs text-muted-foreground font-press-start"> {/* Adjusted text-sm to text-xs, added font-press-start */}
            {users.filter((u) => u.online).length} users online • Slippy is watching 👁
          </p>
        </div>

        {/* Messages Display Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isOwn={message.username === currentUser.username}
              />
            ))}
            <div ref={messagesEndRef} /> {/* For auto-scrolling */}
          </div>
        </ScrollArea>

        {/* Message Input Section */}
        <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 font-inter text-sm" // Ensure input text is readable (font-inter, text-sm)
              maxLength={200}
            />
            <Button
              type="submit"
              disabled={!newMessage.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" /> {/* Send icon */}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};