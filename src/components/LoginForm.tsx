import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string) => void;
}

const LoginForm = ({ onLogin, onSignup }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignupMode) {
      onSignup(email, password);
    } else {
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center blog-hero p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-white/80 text-lg">
            Sign in to continue to your blog
          </p>
        </div>

        <Card className="blog-card slide-up backdrop-blur-lg bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white flex items-center justify-center gap-2">
              <Lock className="h-6 w-6" />
              {isSignupMode ? "Create Account" : "Sign In"}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-field bg-white/5 border-white/20">
                <Label htmlFor="email" className="text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-neutral-800" />
                  <span className="font-bold text-neutral-800 text-base">Email</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border-0 bg-transparent text-neutral-900 placeholder:text-neutral-500 font-semibold text-base"
                  required
                />
              </div>

              <div className="form-field bg-white/5 border-white/20">
                <Label htmlFor="password" className="text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-neutral-800" />
                  <span className="font-bold text-neutral-800 text-base">Password</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="border-0 bg-transparent text-neutral-900 placeholder:text-neutral-500 pr-10 font-semibold text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="btn-hero w-full text-lg py-6">
                {isSignupMode ? "Sign Up" : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              {isSignupMode ? (
                <p className="text-white/80">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsSignupMode(false)}
                    className="text-white font-medium hover:text-primary transition-colors underline"
                  >
                    Sign in here
                  </button>
                </p>
              ) : (
                <p className="text-white/80">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsSignupMode(true)}
                    className="text-white font-medium hover:text-primary transition-colors underline"
                  >
                    Sign up here
                  </button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;