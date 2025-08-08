// // import { cn } from "@/lib/utils";
// // import type { Message } from "./ChatPage";

// // interface ChatMessageProps {
// //   message: Message;
// //   isOwn: boolean;
// // }

// // export const ChatMessage = ({ message, isOwn }: ChatMessageProps) => {
// //   const formatTime = (timestamp: Date) => {
// //     return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// //   };

// //   return (
// //     <div className={cn(
// //       "flex gap-3 animate-bounce-in",
// //       isOwn && "flex-row-reverse"
// //     )}>
// //       {/* Avatar */}
// //       <div className="flex-shrink-0">
// //         <div className={cn(
// //           "w-10 h-10 rounded-full flex items-center justify-center text-lg",
// //           message.isSlippyFake 
// //             ? "bg-destructive/20 border-2 border-destructive/30 animate-pulse" 
// //             : "bg-secondary"
// //         )}>
// //           {message.avatar}
// //         </div>
// //       </div>

// //       {/* Message Content */}
// //       <div className={cn(
// //         "flex-1 max-w-xs sm:max-w-md",
// //         isOwn && "flex flex-col items-end"
// //       )}>
// //         {/* Username and timestamp */}
// //         <div className={cn(
// //           "flex items-center gap-2 mb-1 text-xs text-muted-foreground",
// //           isOwn && "flex-row-reverse"
// //         )}>
// //           <span className="font-medium">
// //             {message.username}
// //             {message.isSlippyFake && " 🎭"}
// //           </span>
// //           <span>{formatTime(message.timestamp)}</span>
// //         </div>

// //         {/* Message bubble */}
// //         <div className={cn(
// //           "px-4 py-2 rounded-2xl shadow-soft transition-all duration-200 hover:shadow-hover",
// //           isOwn 
// //             ? "bg-chat-bubble-own text-primary-foreground" 
// //             : "bg-chat-bubble-other text-foreground border border-border",
// //           message.isSlippyFake && "border-destructive/30 bg-destructive/5"
// //         )}>
// //           <p className="text-sm leading-relaxed break-words">
// //             {message.content}
// //           </p>
// //         </div>

// //         {/* Slippy indicator */}
// //         {message.isSlippyFake && (
// //           <div className="text-xs text-destructive mt-1 opacity-70">
// //             <span className="animate-pulse">🎭 Slippy was here</span>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };


// import { cn } from "@/lib/utils";
// import type { Message } from "./ChatPage";

// interface ChatMessageProps {
//   message: Message;
//   isOwn: boolean;
// }

// export const ChatMessage = ({ message, isOwn }: ChatMessageProps) => {
//   // Handle both Date objects and ISO strings from backend
//   const formatTime = (timestamp: string | Date) => {
//     const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   // Chaos detection (only from backend)
//   const isSlippy =
//     message.username?.toLowerCase().includes("slippy") ||
//     message.content?.toLowerCase().includes("slippy meddled");

//   return (
//     <div className={cn("flex gap-3", isOwn && "flex-row-reverse")}>
//       {/* Avatar */}
//       <div className="flex-shrink-0">
//         <div
//           className={cn(
//             "w-10 h-10 rounded-full flex items-center justify-center text-lg border",
//             isSlippy
//               ? "bg-destructive/20 border-destructive/50 animate-pulse"
//               : "bg-secondary border-border"
//           )}
//         >
//           {message.avatar || "🙂"}
//         </div>
//       </div>

//       {/* Message Content */}
//       <div
//         className={cn(
//           "flex-1 max-w-xs sm:max-w-md",
//           isOwn && "flex flex-col items-end"
//         )}
//       >
//         {/* Username + Time */}
//         <div
//           className={cn(
//             "flex items-center gap-2 mb-1 text-xs text-muted-foreground",
//             isOwn && "flex-row-reverse"
//           )}
//         >
//           <span className="font-medium">
//             {message.username} {isSlippy && "🎭"}
//           </span>
//           <span>{formatTime(message.timestamp || new Date())}</span>
//         </div>

//         {/* Message bubble */}
//         <div
//           className={cn(
//             "px-4 py-2 rounded-2xl shadow-sm transition-all duration-200",
//             isOwn
//               ? "bg-primary text-primary-foreground"
//               : "bg-muted text-foreground",
//             isSlippy && "border border-destructive/30 bg-destructive/5"
//           )}
//         >
//           <p className="text-sm leading-relaxed break-words">{message.content}</p>
//         </div>

//         {/* Slippy label */}
//         {isSlippy && (
//           <div className="text-xs text-destructive mt-1 opacity-70">
//             🎭 Slippy was here
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// import { cn } from "@/lib/utils";
// import type { Message } from "./ChatPage";

// interface ChatMessageProps {
//   message: Message;
//   isOwn: boolean;
// }

// export const ChatMessage = ({ message, isOwn }: ChatMessageProps) => {
//   // Handle both Date objects and ISO strings from backend for timestamp formatting
//   const formatTime = (timestamp: string | Date) => {
//     const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   // Determine if the message is from 'Slippy' for special styling
//   const isSlippy =
//     message.username?.toLowerCase().includes("slippy") ||
//     message.content?.toLowerCase().includes("slippy meddled");

//   return (
//     // Main message container, uses flexbox for layout
//     <div className={cn(
//       "flex gap-3", // Standard spacing between avatar and message bubble
//       isOwn && "flex-row-reverse" // Reverse order if it's the user's own message
//     )}>
//       {/* Avatar section */}
//       <div className="flex-shrink-0">
//         <div
//           className={cn(
//             "w-10 h-10 rounded-full flex items-center justify-center text-lg border", // Avatar styling
//             isSlippy
//               ? "bg-destructive/20 border-destructive/50 animate-pulse" // Special styling for Slippy's avatar
//               : "bg-secondary border-border" // Default styling for other users
//           )}
//         >
//           {message.avatar || "🙂"} {/* Display avatar or a default emoji */}
//         </div>
//       </div>

//       {/* Message Content section */}
//       <div
//         className={cn(
//           "flex-1 max-w-xs sm:max-w-md", // Allows message bubble to take available width up to a max
//           isOwn && "flex flex-col items-end" // Aligns message to the right if it's the user's own
//         )}
//       >
//         {/* Username and timestamp */}
//         <div
//           className={cn(
//             "flex items-center gap-2 mb-1 text-xs text-muted-foreground", // Smaller text for metadata
//             isOwn && "flex-row-reverse" // Reverse order for own message metadata
//           )}
//         >
//           <span className="font-medium">
//             {message.username} {isSlippy && "🎭"} {/* Display username and Slippy icon if applicable */}
//           </span>
//           <span>{formatTime(message.timestamp || new Date())}</span> {/* Formatted time */}
//         </div>

//         {/* Message bubble itself */}
//         <div
//           className={cn(
//             "px-4 py-2 rounded-2xl shadow-sm transition-all duration-200", // Bubble styling
//             isOwn
//               ? "bg-primary text-primary-foreground" // Styling for own message bubble (red)
//               : "bg-muted text-foreground", // Styling for other users' message bubbles (darker background)
//             isSlippy && "border border-destructive/30 bg-destructive/5" // Special border/background for Slippy's message content
//           )}
//         >
//           {/* The actual message content - uses font-inter for readability */}
//           <p className="font-inter text-xs leading-relaxed break-words">
//             {message.content}
//           </p>
//         </div>

//         {/* Slippy indicator */}
//         {isSlippy && (
//           <div className="text-xs text-destructive mt-1 opacity-70">
//             🎭 Slippy was here
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


import { cn } from "@/lib/utils"; // Assuming cn utility is available

// Interface for a message object, defined here for the standalone component
export interface Message {
  id: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: Date | string; // Allow Date object or ISO string
  isSlippyFake?: boolean; // Optional flag for messages from the "Slippy bot"
}

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
}

export const ChatMessage = ({ message, isOwn }: ChatMessageProps) => {
  // Handle both Date objects and ISO strings from backend for timestamp formatting
  const formatTime = (timestamp: string | Date) => {
    const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Determine if the message is from 'Slippy' for subtle indication
  const isSlippy =
    message.username?.toLowerCase().includes("slippy") ||
    message.content?.toLowerCase().includes("slippy meddled") ||
    message.isSlippyFake; // Use the passed prop if available

  return (
    // Main message container, uses flexbox for layout
    <div className={cn(
      "flex gap-3", // Standard spacing between avatar and message bubble
      isOwn && "flex-row-reverse" // Reverse order if it's the user's own message
    )}>
      {/* Avatar section */}
      <div className="flex-shrink-0">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-lg border", // Avatar styling
            // Slippy's avatar styling is now identical to other users for unnoticeability
            "bg-secondary border-border" // Default styling for all users, including Slippy
          )}
        >
          {message.avatar || "🙂"} {/* Display avatar or a default emoji */}
        </div>
      </div>

      {/* Message Content section */}
      <div
        className={cn(
          "flex-1 max-w-xs sm:max-w-md", // Allows message bubble to take available width up to a max
          isOwn && "flex flex-col items-end" // Aligns message to the right if it's the user's own
        )}
      >
        {/* Username and timestamp */}
        <div
          className={cn(
            "flex items-center gap-2 mb-1 text-xs text-muted-foreground", // Smaller text for metadata
            isOwn && "flex-row-reverse" // Reverse order for own message metadata
          )}
        >
          <span className="font-medium">
            {message.username} {isSlippy && "🎭"} {/* Display username and Slippy icon if applicable */}
          </span>
          <span>{formatTime(message.timestamp || new Date())}</span> {/* Formatted time */}
        </div>

        {/* Message bubble itself */}
        <div
          className={cn(
            "px-4 py-2 rounded-2xl shadow-sm transition-all duration-200", // Bubble styling
            isOwn
              ? "bg-primary text-primary-foreground" // Styling for own message bubble (red)
              // Slippy's message bubble is now identical to other users' messages
              : "bg-muted text-foreground border border-border" // Default styling for other users
          )}
        >
          {/* The actual message content - uses font-inter for readability */}
          <p className="font-inter text-xs leading-relaxed break-words">
            {message.content}
          </p>
        </div>

        {/* Slippy indicator (kept for subtle hint, outside the bubble) */}
        {isSlippy && (
          <div className="text-xxs text-destructive mt-1 opacity-70">
            🎭
          </div>
        )}
      </div>
    </div>
  );
};
