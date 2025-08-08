import { useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserList } from "./UserList";
import { ChatMessage } from "./ChatMessage";
import { Send } from "lucide-react";

export interface User {
  id: string;
  username: string;
  avatar: string;
  online: boolean;
}

export interface Message {
  id: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: Date;
  isSlippyFake?: boolean;
}

interface ChatPageProps {
  currentUser: User;
  onLogout: () => void;
}

export const ChatPage = ({ currentUser, onLogout }: ChatPageProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });
    socketRef.current = socket;

    // Join the chat
    socket.emit("join", {
      username: currentUser.username,
      avatar: currentUser.avatar,
    });

    // Updated user list
    socket.on("users", (userList: any[]) => {
      const mapped: User[] = userList.map((u) => ({
        id: u.id || u.username,
        username: u.username,
        avatar: u.avatar || "🙂",
        online: true,
      }));
      setUsers(mapped);
    });

    // New incoming message
    socket.on("chat", (data: any) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          username: data.username,
          avatar: data.avatar || "🙂",
          content: data.content,
          timestamp: new Date(),
          isSlippyFake:
            data.username?.toLowerCase().includes("slippy") ||
            data.content?.toLowerCase().includes("slippy meddled"),
        },
      ]);
    });

    // Mark user offline
    socket.on("user_left", (userId: string) => {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, online: false } : u
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    socketRef.current?.emit("send", {
      username: currentUser.username,
      avatar: currentUser.avatar,
      content: newMessage.trim(),
    });

    setNewMessage("");
  };

  return (
    <div className="h-screen bg-gradient-chat flex">
      {/* User List */}
      <div className="w-1/4 border-r border-border bg-card/50 backdrop-blur-sm">
        <UserList
          users={users}
          currentUserName={currentUser.username} // ✅ correct variable
          onLogout={onLogout}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Slippy Chat Room
          </h2>
          <p className="text-sm text-muted-foreground">
            {users.filter((u) => u.online).length} users online • Slippy is watching 👁
          </p>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isOwn={message.username === currentUser.username}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              maxLength={200}
            />
            <Button
              type="submit"
              disabled={!newMessage.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};