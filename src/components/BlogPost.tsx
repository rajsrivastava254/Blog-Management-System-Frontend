import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface BlogPostProps {
  id?: string;
  title: string;
  content: string;
  author?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
}

const BlogPost = ({ 
  id,
  title, 
  content, 
  author = "Anonymous", 
  date = new Date().toLocaleDateString(),
  readTime = "2 min read",
  tags = []
}: BlogPostProps) => {
  return (
    <Link
      to={`/post/${encodeURIComponent(String(id ?? ""))}`}
      state={{ title, content, author, date, readTime, tags }}
      className="block no-underline group animate-fade-in"
    >
      <Card className="relative overflow-hidden blog-card bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-900/50 border border-purple-500/20 hover:border-purple-500/50 backdrop-blur-xl cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-center flex-wrap gap-4 text-sm text-slate-400 mb-4">
            <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-lg">
              <User className="h-4 w-4 text-purple-400" />
              <span className="text-slate-200 font-medium">{author}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-lg">
              <Calendar className="h-4 w-4 text-pink-400" />
              <span className="text-slate-200 text-sm">{date}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-lg">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-slate-200 text-sm">{readTime}</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-purple-200 transition-all duration-300">
            {title}
          </h2>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag, index) => (
                <Badge key={index} className="bg-purple-500/30 text-purple-200 hover:bg-purple-500/50 border border-purple-500/50 text-xs font-medium transition-all duration-300">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="relative z-10">
          <p className="text-slate-300 leading-relaxed line-clamp-3 group-hover:text-slate-200 transition-colors duration-300">
            {content.length > 200 ? `${content.substring(0, 200)}...` : content}
          </p>
          
          <div className="flex items-center gap-2 text-purple-400 font-semibold mt-4 group-hover:text-pink-400 transition-all duration-300 transform group-hover:translate-x-2">
            <span>Read more</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogPost;