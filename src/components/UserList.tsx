// // import { Button } from "@/components/ui/button";
// // import { LogOut } from "lucide-react";
// // import type { User } from "./ChatPage";

// // interface UserListProps {
// //   users: User[];
// //   currentUserId: string;
// //   onLogout: () => void;
// // }

// // export const UserList = ({ users, currentUserId, onLogout }: UserListProps) => {
// //   return (
// //     <div className="h-full flex flex-col">
// //       {/* Header */}
// //       <div className="p-4 border-b border-border">
// //         <div className="flex items-center justify-between">
// //           <h3 className="font-semibold text-lg">Online Users</h3>
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             onClick={onLogout}
// //             className="hover:bg-destructive hover:text-destructive-foreground"
// //           >
// //             <LogOut className="h-4 w-4" />
// //           </Button>
// //         </div>
// //         <p className="text-sm text-muted-foreground mt-1">
// //           {users.filter(u => u.online).length} connected
// //         </p>
// //       </div>

// //       {/* Users List */}
// //       <div className="flex-1 p-4 space-y-3">
// //         {users.map((user) => (
// //           <div
// //             key={user.id}
// //             className={`
// //               flex items-center gap-3 p-3 rounded-lg transition-all duration-200
// //               ${user.id === currentUserId 
// //                 ? "bg-primary/10 border border-primary/20" 
// //                 : "bg-muted/50 hover:bg-muted"
// //               }
// //             `}
// //           >
// //             <div className="relative">
// //               <div className="text-2xl">{user.avatar}</div>
// //               <div 
// //                 className={`
// //                   absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card
// //                   ${user.online ? "bg-user-online" : "bg-user-away"}
// //                 `}
// //               />
// //             </div>
// //             <div className="flex-1 min-w-0">
// //               <p className="font-medium truncate">
// //                 {user.username}
// //                 {user.id === currentUserId && " (You)"}
// //                 {user.id === "slippy" && " 👁️"}
// //               </p>
// //               <p className="text-xs text-muted-foreground">
// //                 {user.online ? "Online" : "Away"}
// //               </p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Slippy Warning */}
// //       <div className="p-4 border-t border-border">
// //         <div className="bg-accent/20 p-3 rounded-lg">
// //           <div className="flex items-center gap-2 mb-1">
// //             <span className="text-lg animate-wiggle">🤖</span>
// //             <span className="font-semibold text-sm">Slippy is Active</span>
// //           </div>
// //           <p className="text-xs text-muted-foreground">
// //             Messages might not be what they seem...
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import type { User } from "./ChatPage";

// interface UserListProps {
//   users: User[];
//   currentUserName: string;
//   onLogout: () => void;
// }

// export const UserList = ({ users, currentUserName, onLogout }: UserListProps) => {
//   return (
//     <div className="h-full flex flex-col">
//       {/* Title */}
//       <div className="p-4 border-b border-border">
//         <h3 className="font-semibold text-lg bg-gradient-primary bg-clip-text text-transparent">
//           Chat Room Users
//         </h3>
//         <p className="text-xs text-muted-foreground">
//           {users.length} online
//         </p>
//       </div>

//       {/* Users */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className={cn(
//               "flex items-center gap-3 p-2 rounded-lg transition-colors",
//               user.id === currentUserName
//                 ? "bg-primary/10 border border-primary/30"
//                 : "hover:bg-muted/50"
//             )}
//           >
//             {/* Avatar */}
//             <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-lg">
//               {user.avatar || "🙂"}
//             </div>

//             {/* Name */}
//             <div className="flex-1">
//               <p
//                 className={cn(
//                   "text-sm font-medium",
//                   user.id === currentUserName && "text-primary"
//                 )}
//               >
//                 {user.username}
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 {user.online ? "Online" : "Offline"}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Logout */}
//       <div className="p-4 border-t border-border">
//         <Button
//           variant="destructive"
//           className="w-full"
//           onClick={onLogout}
//         >
//           Leave Chat
//         </Button>
//       </div>
//     </div>
//   );
// };



import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User } from "./ChatPage";
import { LogOut } from "lucide-react"; // Import LogOut icon

interface UserListProps {
  users: User[];
  currentUserName: string;
  onLogout: () => void;
}

export const UserList = ({ users, currentUserName, onLogout }: UserListProps) => {
  return (
    <div className="h-full flex flex-col bg-card text-foreground rounded-lg p-2">
      {/* Title section */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-lg bg-gradient-primary bg-clip-text text-transparent">
          Chat Room Users
        </h3>
        <p className="text-xs text-muted-foreground font-inter"> {/* Applied font-inter for readability */}
          {users.length} online
        </p>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2"> {/* Reduced space-y for tighter list */}
        {users.map((user) => (
          <div
            key={user.id}
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg transition-colors", // Reduced gap and padding slightly
              user.id === currentUserName
                ? "bg-primary/10 border border-primary/30"
                : "hover:bg-muted/50"
            )}
          >
            {/* Avatar */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-base"> {/* Reduced size for avatar and text */}
              {user.avatar || "🙂"}
            </div>

            {/* Name and Status */}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "text-xs font-medium truncate", // Reduced text-sm to text-xs
                  user.id === currentUserName && "text-primary"
                )}
              >
                {user.username}
                {user.id === currentUserName && " (You)"} {/* Added (You) for current user */}
                {user.id === "slippy" && " 👁️"} {/* Icon for Slippy user */}
              </p>
              <p className="text-xxs text-muted-foreground font-inter"> {/* Reduced text-xs further, applied font-inter */}
                {user.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Slippy Warning */}
      <div className="p-4 border-t border-border">
        <div className="bg-accent/20 p-3 rounded-lg border border-accent/30"> {/* Added border for warning box */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg animate-wiggle">🤖</span>
            <span className="font-semibold text-xs font-inter">Slippy is Active</span> {/* Reduced text-sm to text-xs, applied font-inter */}
          </div>
          <p className="text-xxs text-muted-foreground font-inter"> {/* Reduced text-xs further, applied font-inter */}
            Messages might not be what they seem...
          </p>
        </div>
      </div>

      {/* Logout button */}
      <div className="p-4 border-t border-border">
        <Button
          variant="destructive"
          className="w-full text-sm py-2" // Reduced font size and padding for the button
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-2" /> Leave Chat {/* Added LogOut icon */}
        </Button>
      </div>
    </div>
  );
};
