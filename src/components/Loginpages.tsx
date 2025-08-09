// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";

// const avatars = [
//   "🐸", "🦄", "🐝", "🦊", "🐨", "🐳", "🦋", "🐙", "🦜", "🐺",
//   "🐯", "🦁", "🐼", "🐧", "🦘", "🐱", "🐶", "🐰", "🐹", "🐻"
// ];

// export const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const trimmedName = username.trim();
//     if (!trimmedName) return;

//     // Save to session storage
//     sessionStorage.setItem("slippy:name", trimmedName);
//     sessionStorage.setItem("slippy:avatar", selectedAvatar);

//     // Navigate to chat page
//     navigate("/chat");
//   };

//   return (
//     <div
//       className="min-h-screen bg-gradient-background flex items-center justify-center p-4"
//       style={{ backgroundImage: "var(--gradient-doodle)" }}
//     >
//       <Card className="w-full max-w-md p-8 shadow-soft bg-card animate-bounce-in">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 animate-float">
//             Welcome to Slippy
//           </h1>
//           <p className="text-muted-foreground">
//             The chat app that keeps you guessing 🤪
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Username input */}
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium mb-2">
//               Your Name
//             </label>
//             <Input
//               id="username"
//               type="text"
//               placeholder="Enter your name..."
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full"
//               maxLength={20}
//             />
//           </div>

//           {/* Avatar selection */}
//           <div>
//             <label className="block text-sm font-medium mb-3">
//               Choose Your Avatar
//             </label>
//             <div className="grid grid-cols-5 gap-2">
//               {avatars.map((avatar) => (
//                 <button
//                   key={avatar}
//                   type="button"
//                   onClick={() => setSelectedAvatar(avatar)}
//                   className={`w-12 h-12 text-2xl rounded-lg transition-all duration-200 ${
//                     selectedAvatar === avatar
//                       ? "bg-primary shadow-glow scale-110"
//                       : "bg-muted hover:bg-secondary hover:scale-105"
//                   }`}
//                 >
//                   {avatar}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Submit button */}
//           <Button
//             type="submit"
//             disabled={!username.trim()}
//             className="w-full bg-gradient-primary hover:shadow-hover transition-all duration-300"
//           >
//             Join the Chaos! 🚀
//           </Button>
//         </form>

//         {/* Footer */}
//         <div className="mt-6 p-4 bg-accent/20 rounded-lg">
//           <p className="text-sm text-center">
//             <span className="font-semibold">Warning:</span> Slippy bot is watching... 👁
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// };

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";

// // Array of fun avatars for selection
// const avatars = [
//   "🐸", "🦄", "🐝", "🦊", "🐨", "🐳", "🦋", "🐙", "🦜", "🐺",
//   "🐯", "🦁", "🐼", "🐧", "🦘", "🐱", "🐶", "🐰", "🐹", "🐻"
// ];

// export const LoginPage = () => {
//   // State for the username input
//   const [username, setUsername] = useState("");
//   // State for the currently selected avatar, defaulting to the first one
//   const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
//   // Hook for programmatic navigation
//   const navigate = useNavigate();

//   // Handler for form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     const trimmedName = username.trim(); // Trim whitespace from the username
//     if (!trimmedName) return; // If name is empty after trimming, do nothing

//     // Save username and selected avatar to session storage
//     sessionStorage.setItem("slippy:name", trimmedName);
//     sessionStorage.setItem("slippy:avatar", selectedAvatar);

//     // Navigate to the chat page
//     navigate("/chat");
//   };

//   return (
//     // Main container for the login page, with a dark background and centered content
//     <div
//       className="min-h-screen bg-gradient-background flex items-center justify-center p-4 font-inter text-foreground"
//     >
//       {/* Card component for the login form, with dark background and animation */}
//       <Card className="w-full max-w-md p-8 shadow-2xl bg-card rounded-lg animate-bounce-in">
//         {/* Header section */}
//         <div className="text-center mb-8">
//           {/* Main title with 'Press Start 2P' font and red gradient */}
//           <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 animate-float font-['Press_Start_2P']">
//             Welcome to Slippy
//           </h1>
//           {/* Tagline with muted text color */}
//           <p className="text-muted-foreground">
//             The chat app that keeps you guessing 🤪
//           </p>
//         </div>

//         {/* Login form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Username input section */}
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium mb-2 text-foreground">
//               Your Name
//             </label>
//             <Input
//               id="username"
//               type="text"
//               placeholder="Enter your name..."
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring focus:border-ring rounded-md"
//               maxLength={20}
//             />
//           </div>

//           {/* Avatar selection section */}
//           <div>
//             <label className="block text-sm font-medium mb-3 text-foreground">
//               Choose Your Avatar
//             </label>
//             <div className="grid grid-cols-5 gap-2">
//               {avatars.map((avatar) => (
//                 <button
//                   key={avatar}
//                   type="button"
//                   onClick={() => setSelectedAvatar(avatar)}
//                   className={`
//                     w-12 h-12 text-2xl rounded-lg transition-all duration-200
//                     flex items-center justify-center
//                     ${
//                       selectedAvatar === avatar
//                         ? "bg-primary shadow-glow scale-110 border-2 border-white" // Selected avatar styling (red background, glow, scale, white border)
//                         : "bg-muted hover:bg-secondary hover:scale-105 border border-muted" // Unselected avatar styling (dark gray, hover effect)
//                     }
//                   `}
//                 >
//                   {avatar}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Submit button */}
//           <Button
//             type="submit"
//             disabled={!username.trim()} // Disable button if username is empty
//             className="w-full bg-gradient-primary text-primary-foreground hover:shadow-hover transition-all duration-300 rounded-lg py-3 px-6 text-lg font-bold"
//           >
//             Join the Chaos! 🚀
//           </Button>
//         </form>

//         {/* Footer warning */}
//         <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/30">
//           <p className="text-sm text-center text-muted-foreground">
//             <span className="font-semibold text-primary">Warning:</span> Slippy bot is watching... 👁️
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// };


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";

// // Array of fun avatars for selection
// const avatars = [
//   "🐸", "🦄", "🐝", "🦊", "🐨", "🐳", "🦋", "🐙", "🦜", "🐺",
//   "🐯", "🦁", "🐼", "🐧", "🦘", "🐱", "🐶", "🐰", "🐹", "🐻"
// ];

// export const LoginPage = () => {
//   // State for the username input
//   const [username, setUsername] = useState("");
//   // State for the currently selected avatar, defaulting to the first one
//   const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
//   // Hook for programmatic navigation
//   const navigate = useNavigate();

//   // Handler for form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     const trimmedName = username.trim(); // Trim whitespace from the username
//     if (!trimmedName) return; // If name is empty after trimming, do nothing

//     // Save username and selected avatar to session storage
//     sessionStorage.setItem("slippy:name", trimmedName);
//     sessionStorage.setItem("slippy:avatar", selectedAvatar);

//     // Navigate to the chat page
//     navigate("/chat");
//   };

//   return (
//     // Main container for the login page, with a dark background and centered content.
//     // Removed 'font-inter' here so it inherits the 'font-press-start' from body.
//     <div
//       className="min-h-screen bg-gradient-background flex items-center justify-center p-4 text-foreground"
//     >
//       {/* Card component for the login form, with dark background and animation */}
//       <Card className="w-full max-w-md p-8 shadow-2xl bg-card rounded-lg animate-bounce-in">
//         {/* Header section */}
//         <div className="text-center mb-8">
//           {/* Main title with 'Press Start 2P' font and red gradient (explicitly set) */}
//           <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 animate-float font-press-start">
//             Welcome to Slippy
//           </h1>
//           {/* Tagline with muted text color - explicitly set to Inter for readability */}
//           <p className="text-muted-foreground font-inter text-base">
//             The chat app that keeps you guessing 🤪
//           </p>
//         </div>

//         {/* Login form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Username input section */}
//           <div>
//             {/* Label - explicitly set to Inter for readability */}
//             <label htmlFor="username" className="block text-sm font-medium mb-2 text-foreground font-inter">
//               Your Name
//             </label>
//             <Input
//               id="username"
//               type="text"
//               placeholder="Enter your name..."
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring focus:border-ring rounded-md font-inter" // Input text explicitly set to Inter
//               maxLength={20}
//             />
//           </div>

//           {/* Avatar selection section */}
//           <div>
//             {/* Label - explicitly set to Inter for readability */}
//             <label className="block text-sm font-medium mb-3 text-foreground font-inter">
//               Choose Your Avatar
//             </label>
//             <div className="grid grid-cols-5 gap-2">
//               {avatars.map((avatar) => (
//                 <button
//                   key={avatar}
//                   type="button"
//                   onClick={() => setSelectedAvatar(avatar)}
//                   className={`
//                     w-12 h-12 text-2xl rounded-lg transition-all duration-200
//                     flex items-center justify-center
//                     ${
//                       selectedAvatar === avatar
//                         ? "bg-primary shadow-glow scale-110 border-2 border-white" // Selected avatar styling (red background, glow, scale, white border)
//                         : "bg-muted hover:bg-secondary hover:scale-105 border border-muted" // Unselected avatar styling (dark gray, hover effect)
//                     }
//                   `}
//                 >
//                   {avatar}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Submit button - text will default to font-press-start from global body style */}
//           <Button
//             type="submit"
//             disabled={!username.trim()} // Disable button if username is empty
//             className="w-full bg-gradient-primary text-primary-foreground hover:shadow-hover transition-all duration-300 rounded-lg py-3 px-6 text-lg font-bold"
//           >
//             Join the Chaos! 🚀
//           </Button>
//         </form>

//         {/* Footer warning - explicitly set to Inter for readability */}
//         <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/30 font-inter text-sm">
//           <p className="text-center text-muted-foreground">
//             <span className="font-semibold text-primary">Warning:</span> Slippy bot is watching... 👁️
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// };


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";

// // Array of fun avatars for selection
// const avatars = [
//   "🐸", "🦄", "🐝", "🦊", "🐨", "🐳", "🦋", "🐙", "🦜", "🐺",
//   "🐯", "🦁", "🐼", "🐧", "🦘", "🐱", "🐶", "🐰", "🐹", "🐻"
// ];

// export const LoginPage = () => {
//   // State for the username input
//   const [username, setUsername] = useState("");
//   // State for the currently selected avatar, defaulting to the first one
//   const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
//   // Hook for programmatic navigation
//   const navigate = useNavigate();

//   // Handler for form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     const trimmedName = username.trim(); // Trim whitespace from the username
//     if (!trimmedName) return; // If name is empty after trimming, do nothing

//     // Save username and selected avatar to session storage
//     sessionStorage.setItem("slippy:name", trimmedName);
//     sessionStorage.setItem("slippy:avatar", selectedAvatar);

//     // Navigate to the chat page
//     navigate("/chat");
//   };

//   return (
//     // Main container for the login page, with a dark background and centered content.
//     // Removed 'font-inter' here so it inherits the 'font-press-start' from body.
//     <div
//       className="min-h-screen bg-gradient-background flex items-center justify-center p-4 text-foreground"
//     >
//       {/* Card component for the login form, with dark background and animation */}
//       <Card className="w-full max-w-md p-8 shadow-2xl bg-card rounded-lg animate-bounce-in">
//         {/* Header section */}
//         <div className="text-center mb-8">
//           {/* Main title with 'Press Start 2P' font and red gradient (explicitly set) */}
//           <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 animate-float font-press-start">
//             Welcome to Slippy
//           </h1>
//           {/* Tagline with muted text color - explicitly set to Inter for readability */}
//           <p className="text-muted-foreground font-inter text-base">
//             വാക്ക് ഉണ്ട്. അർത്ഥമില്ല. കാഴ്ച ഉണ്ട്. സത്യമില്ല.
//           </p>
//         </div>

//         {/* Login form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Username input section */}
//           <div>
//             {/* Label - explicitly set to Inter for readability and now using text-primary */}
//             <label htmlFor="username" className="block text-sm font-medium mb-2 text-primary font-inter">
//               Your Name
//             </label>
//             <Input
//               id="username"
//               type="text"
//               placeholder="Enter your name..."
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring focus:border-ring rounded-md font-inter" // Input text explicitly set to Inter
//               maxLength={20}
//             />
//           </div>

//           {/* Avatar selection section */}
//           <div>
//             {/* Label - explicitly set to Inter for readability and now using text-primary */}
//             <label className="block text-sm font-medium mb-3 text-primary font-inter">
//               Choose Your Avatar
//             </label>
//             <div className="grid grid-cols-5 gap-2">
//               {avatars.map((avatar) => (
//                 <button
//                   key={avatar}
//                   type="button"
//                   onClick={() => setSelectedAvatar(avatar)}
//                   className={`
//                     w-12 h-12 text-2xl rounded-lg transition-all duration-200
//                     flex items-center justify-center
//                     ${
//                       selectedAvatar === avatar
//                         ? "bg-primary shadow-glow scale-110 border-2 border-white" // Selected avatar styling (red background, glow, scale, white border)
//                         : "bg-muted hover:bg-secondary hover:scale-105 border border-muted" // Unselected avatar styling (dark gray, hover effect)
//                     }
//                   `}
//                 >
//                   {avatar}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Submit button - text will default to font-press-start from global body style */}
//           <Button
//             type="submit"
//             disabled={!username.trim()} // Disable button if username is empty
//             className="w-full bg-gradient-primary text-primary-foreground hover:shadow-hover transition-all duration-300 rounded-lg py-3 px-6 text-lg font-bold"
//           >
//             Join the Chaos! 🚀
//           </Button>
//         </form>

//         {/* Footer warning - explicitly set to Inter for readability */}
//         <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/30 font-inter text-sm">
//           <p className="text-center text-muted-foreground">
//             <span className="font-semibold text-primary">Warning:</span> Slippy bot is watching... 👁️
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// };


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const avatars = [
  "🐸", "🦄", "🐝", "🦊", "🐨", "🐳", "🦋", "🐙", "�", "🐺",
  "🐯", "🦁", "🐼", "🐧", "🦘", "🐱", "🐶", "🐰", "🐹", "🐻"
];

export const LoginPage = () => {
  // State for the username input
  const [username, setUsername] = useState("");
  // State for the currently selected avatar, defaulting to the first one
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    const trimmedName = username.trim(); // Trim whitespace from the username
    if (!trimmedName) return; // If name is empty after trimming, do nothing

    // Save username and selected avatar to session storage
    sessionStorage.setItem("slippy:name", trimmedName);
    sessionStorage.setItem("slippy:avatar", selectedAvatar);

    // Navigate to the chat page
    navigate("/chat");
  };

  return (
    // Main container for the login page, with a dark background and centered content.
    // Removed 'font-inter' here so it inherits the 'font-press-start' from body.
    <div
      className="min-h-screen bg-gradient-background flex items-center justify-center p-4 text-foreground"
    >
      {/* Card component for the login form, with dark background and animation */}
      <Card className="w-full max-w-md p-8 shadow-2xl bg-card rounded-lg animate-bounce-in">
        {/* Header section */}
        <div className="text-center mb-8">
          {/* Main title with 'Press Start 2P' font and red gradient (explicitly set) */}
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 animate-float font-press-start">
            Welcome to Slippy
          </h1>
          {/* Tagline with muted text color - explicitly set to Inter for readability */}
          <p className="text-muted-foreground font-inter text-xs font-black mt-5 "> {/* Reduced text-base to text-xs and added font-bold */}
            വാക്ക് ഉണ്ട്. അർത്ഥമില്ല. കാഴ്ച ഉണ്ട്. സത്യമില്ല.
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username input section */}
          <div>
            {/* Label - explicitly set to Inter for readability and now using text-primary */}
            <label htmlFor="username" className="block text-sm font-medium mb-2 text-primary font-inter">
              Your Name
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring focus:border-ring rounded-md font-inter" // Input text explicitly set to Inter
              maxLength={20}
            />
          </div>

          {/* Avatar selection section */}
          <div>
            {/* Label - explicitly set to Inter for readability and now using text-primary */}
            <label className="block text-sm font-medium mb-3 text-primary font-inter">
              Choose Your Avatar
            </label>
            <div className="grid grid-cols-5 gap-2">
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`
                    w-12 h-12 text-2xl rounded-lg transition-all duration-200
                    flex items-center justify-center
                    ${
                      selectedAvatar === avatar
                        ? "bg-primary shadow-glow scale-40 border-2 border-white" // Selected avatar styling (red background, glow, scale, white border)
                        : "bg-muted hover:bg-secondary hover:scale-105 border border-muted" // Unselected avatar styling (dark gray, hover effect)
                    }
                  `}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          {/* Submit button - text will default to font-press-start from global body style */}
          <Button
            type="submit"
            disabled={!username.trim()} // Disable button if username is empty
            className="w-full bg-gradient-primary text-primary-foreground hover:shadow-hover transition-all duration-300 rounded-lg py-3 px-6 text-lg font-bold"
          >
            Join the Chaos! 🚀
          </Button>
        </form>

        {/* Footer warning - explicitly set to Inter for readability */}
        <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/30 font-inter text-sm">
          <p className="text-center text-muted-foreground">
            <span className="font-semibold text-primary">Warning:</span> Slippy bot is watching... 👁️
          </p>
        </div>
      </Card>
    </div>
  );
};
