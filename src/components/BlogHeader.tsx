import { Button } from "@/components/ui/button";
import { LogOut, PenTool, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ThemeToggle from "./ThemeToggle";

interface BlogHeaderProps {
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const BlogHeader = ({ onLogout, searchQuery, onSearchChange }: BlogHeaderProps) => {
  return (
    <header className="blog-hero py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-start mb-8 fade-in">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              My Blog
            </h1>
            <p className="text-xl text-white/80">
              Share your thoughts with the world
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button 
              onClick={onLogout}
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="relative slide-up stagger-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search posts..."
            className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm h-12 text-lg"
          />
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;