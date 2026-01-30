import { Button } from "@/components/ui/button";
import { LogOut, PenTool, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import ThemeToggle from "./ThemeToggle";

interface BlogHeaderProps {
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const BlogHeader = ({ onLogout, searchQuery, onSearchChange }: BlogHeaderProps) => {
  return (
    <header className="relative overflow-hidden border-b border-white/10">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/30" />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(167,139,250,0.1)_1px,transparent_1px),linear-gradient(rgba(167,139,250,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative container mx-auto max-w-6xl px-4 py-12">
        <div className="flex justify-between items-start mb-10">
          <div className="flex-1 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
              <span className="text-sm font-semibold text-purple-300 tracking-widest uppercase">Creative Blog</span>
            </div>
            <h1 className="text-6xl font-black text-white mb-3 tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-fade-in">
              My Blog
            </h1>
            <p className="text-lg text-slate-300 font-light">
              Share your creative thoughts and inspire others
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button 
              onClick={onLogout}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-purple-400 pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search posts by title, content, or tags..."
              className="pl-12 pr-6 bg-slate-900/50 border border-purple-500/30 hover:border-purple-500/50 focus:border-purple-500 text-white placeholder:text-slate-500 backdrop-blur-sm h-14 text-base rounded-2xl transition-all duration-300 shadow-lg focus:shadow-xl focus:shadow-purple-500/20"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;