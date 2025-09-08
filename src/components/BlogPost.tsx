import { Calendar, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogPostProps {
  title: string;
  content: string;
  author?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
}

const BlogPost = ({ 
  title, 
  content, 
  author = "Anonymous", 
  date = new Date().toLocaleDateString(),
  readTime = "2 min read",
  tags = []
}: BlogPostProps) => {
  return (
    <Card className="blog-card fade-in group">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h2>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {content.length > 200 ? `${content.substring(0, 200)}...` : content}
        </p>
        
        {content.length > 200 && (
          <button className="text-primary hover:text-primary/80 font-medium mt-3 transition-colors">
            Read more →
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogPost;