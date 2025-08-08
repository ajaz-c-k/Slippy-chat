// import { cn } from "@/lib/utils";
// import type { Message } from "./ChatPage";

// interface ChatMessageProps {
//   message: Message;
//   isOwn: boolean;
// }

// export const ChatMessage = ({ message, isOwn }: ChatMessageProps) => {
//   const formatTime = (timestamp: Date) => {
//     return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div className={cn(
//       "flex gap-3 animate-bounce-in",
//       isOwn && "flex-row-reverse"
//     )}>
//       {/* Avatar */}
//       <div className="flex-shrink-0">
//         <div className={cn(
//           "w-10 h-10 rounded-full flex items-center justify-center text-lg",
//           message.isSlippyFake 
//             ? "bg-destructive/20 border-2 border-destructive/30 animate-pulse" 
//             : "bg-secondary"
//         )}>
//           {message.avatar}
//         </div>
//       </div>

//       {/* Message Content */}
//       <div className={cn(
//         "flex-1 max-w-xs sm:max-w-md",
//         isOwn && "flex flex-col items-end"
//       )}>
//         {/* Username and timestamp */}
//         <div className={cn(
//           "flex items-center gap-2 mb-1 text-xs text-muted-foreground",
//           isOwn && "flex-row-reverse"
//         )}>
//           <span className="font-medium">
//             {message.username}
//             {message.isSlippyFake && " 🎭"}
//           </span>
//           <span>{formatTime(message.timestamp)}</span>
//         </div>

//         {/* Message bubble */}
//         <div className={cn(
//           "px-4 py-2 rounded-2xl shadow-soft transition-all duration-200 hover:shadow-hover",
//           isOwn 
//             ? "bg-chat-bubble-own text-primary-foreground" 
//             : "bg-chat-bubble-other text-foreground border border-border",
//           message.isSlippyFake && "border-destructive/30 bg-destructive/5"
//         )}>
//           <p className="text-sm leading-relaxed break-words">
//             {message.content}
//           </p>
//         </div>

//         {/* Slippy indicator */}
//         {message.isSlippyFake && (
//           <div className="text-xs text-destructive mt-1 opacity-70">
//             <span className="animate-pulse">🎭 Slippy was here</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


import { cn } from "@/lib/utils";
import type { Message } from "./ChatPage";

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
}

export const ChatMessage = ({ message, isOwn }: ChatMessageProps) => {
  // Handle both Date objects and ISO strings from backend
  const formatTime = (timestamp: string | Date) => {
    const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Chaos detection (only from backend)
  const isSlippy =
    message.username?.toLowerCase().includes("slippy") ||
    message.content?.toLowerCase().includes("slippy meddled");

  return (
    <div className={cn("flex gap-3", isOwn && "flex-row-reverse")}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-lg border",
            isSlippy
              ? "bg-destructive/20 border-destructive/50 animate-pulse"
              : "bg-secondary border-border"
          )}
        >
          {message.avatar || "🙂"}
        </div>
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "flex-1 max-w-xs sm:max-w-md",
          isOwn && "flex flex-col items-end"
        )}
      >
        {/* Username + Time */}
        <div
          className={cn(
            "flex items-center gap-2 mb-1 text-xs text-muted-foreground",
            isOwn && "flex-row-reverse"
          )}
        >
          <span className="font-medium">
            {message.username} {isSlippy && "🎭"}
          </span>
          <span>{formatTime(message.timestamp || new Date())}</span>
        </div>

        {/* Message bubble */}
        <div
          className={cn(
            "px-4 py-2 rounded-2xl shadow-sm transition-all duration-200",
            isOwn
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground",
            isSlippy && "border border-destructive/30 bg-destructive/5"
          )}
        >
          <p className="text-sm leading-relaxed break-words">{message.content}</p>
        </div>

        {/* Slippy label */}
        {isSlippy && (
          <div className="text-xs text-destructive mt-1 opacity-70">
            🎭 Slippy was here
          </div>
        )}
      </div>
    </div>
  );
};
