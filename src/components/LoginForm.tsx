import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Eye, EyeOff, Sparkles } from "lucide-react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string) => void;
}

const LoginForm = ({ onLogin, onSignup }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignupMode) {
        onSignup(email, password);
      } else {
        onLogin(email, password);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,81,255,0.3),rgba(255,0,255,0))]" />
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Welcome
          </h1>
          <p className="text-slate-300 text-lg font-light">
            {isSignupMode 
              ? "Join our creative community" 
              : "Welcome back to your blog"}
          </p>
        </div>

        {/* Main Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900/80 via-slate-900/80 to-slate-900/80 border border-purple-500/20 backdrop-blur-2xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-purple-500/5" />
          
          <CardHeader className="relative z-10 border-b border-purple-500/10">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Lock className="h-5 w-5 text-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {isSignupMode ? "Create Account" : "Sign In"}
              </span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="relative z-10 pt-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-purple-400" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/50 focus:border-purple-500 text-white placeholder:text-slate-500 rounded-xl h-12 transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-pink-400" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-slate-800/50 border border-pink-500/20 hover:border-pink-500/50 focus:border-pink-500 text-white placeholder:text-slate-500 pr-12 rounded-xl h-12 transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoading 
                  ? "Loading..." 
                  : isSignupMode 
                    ? "✨ Create Account" 
                    : "🚀 Sign In"}
              </Button>
            </form>

            {/* Toggle Mode */}
            <div className="mt-8 pt-6 border-t border-purple-500/10 text-center">
              <p className="text-slate-400 text-sm mb-3">
                {isSignupMode 
                  ? "Already have an account?" 
                  : "Don't have an account?"}
              </p>
              <button
                onClick={() => setIsSignupMode(!isSignupMode)}
                className="text-purple-400 hover:text-pink-400 font-semibold transition-colors duration-300 text-lg underline underline-offset-2"
              >
                {isSignupMode ? "Sign in here" : "Sign up here"}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-6">
          Created with ❤️ for blogging enthusiasts
        </p>
      </div>
    </div>
  );
};

export default LoginForm;