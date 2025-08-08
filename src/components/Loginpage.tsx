import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const avatars = [
  "🐸", "🦄", "🐝", "🦊", "🐨", "🐳", "🦋", "🐙", "🦜", "🐺",
  "🐯", "🦁", "🐼", "🐧", "🦘", "🐱", "🐶", "🐰", "🐹", "🐻"
];

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = username.trim();
    if (!trimmedName) return;

    // Save to session storage
    sessionStorage.setItem("slippy:name", trimmedName);
    sessionStorage.setItem("slippy:avatar", selectedAvatar);

    // Navigate to chat page
    navigate("/chat");
  };

  return (
    <div
      className="min-h-screen bg-gradient-background flex items-center justify-center p-4"
      style={{ backgroundImage: "var(--gradient-doodle)" }}
    >
      <Card className="w-full max-w-md p-8 shadow-soft bg-card animate-bounce-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 animate-float">
            Welcome to Slippy
          </h1>
          <p className="text-muted-foreground">
            The chat app that keeps you guessing 🤪
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
              maxLength={20}
            />
          </div>

          {/* Avatar selection */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Choose Your Avatar
            </label>
            <div className="grid grid-cols-5 gap-2">
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-12 h-12 text-2xl rounded-lg transition-all duration-200 ${
                    selectedAvatar === avatar
                      ? "bg-primary shadow-glow scale-110"
                      : "bg-muted hover:bg-secondary hover:scale-105"
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={!username.trim()}
            className="w-full bg-gradient-primary hover:shadow-hover transition-all duration-300"
          >
            Join the Chaos! 🚀
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 p-4 bg-accent/20 rounded-lg">
          <p className="text-sm text-center">
            <span className="font-semibold">Warning:</span> Slippy bot is watching... 👁
          </p>
        </div>
      </Card>
    </div>
  );
};