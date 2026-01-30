import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Tag, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PostFormProps {
  onAddPost: (post: { title: string; content: string; tags: string[] }) => void;
}

const PostForm = ({ onAddPost }: PostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    try {
      onAddPost({
        title: title.trim(),
        content: content.trim(),
        tags: tagArray
      });

      // Reset form
      setTitle("");
      setContent("");
      setTags("");
      
      toast({
        title: "🎉 Post created!",
        description: "Your blog post has been published successfully.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="relative overflow-hidden blog-card bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-900/50 border border-pink-500/20 hover:border-pink-500/30 backdrop-blur-xl shadow-2xl slide-up animate-fade-in">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-pink-500/5" />
      
      <CardHeader className="relative z-10 border-b border-pink-500/10">
        <CardTitle className="flex items-center gap-3 text-3xl">
          <div className="p-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg">
            <PlusCircle className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Create New Post
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-pink-400" />
              Post Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging title for your post..."
              className="bg-slate-900/50 border border-pink-500/20 hover:border-pink-500/50 focus:border-pink-500 text-white placeholder:text-slate-500 rounded-xl h-12 text-lg transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/20"
            />
          </div>

          {/* Content Textarea */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              Content
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here... Share your insights, stories, and knowledge with the world."
              className="bg-slate-900/50 border border-purple-500/20 hover:border-purple-500/50 focus:border-purple-500 text-white placeholder:text-slate-500 min-h-[200px] resize-none rounded-xl transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
            />
            <div className="text-xs text-slate-400 text-right">
              {content.length} characters
            </div>
          </div>

          {/* Tags Input */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Tag className="h-4 w-4 text-blue-400" />
              Tags (comma-separated)
            </Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="react, javascript, web development, coding..."
              className="bg-slate-900/50 border border-blue-500/20 hover:border-blue-500/50 focus:border-blue-500 text-white placeholder:text-slate-500 rounded-xl h-12 transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/20"
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0 font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Publishing..." : "✨ Publish Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;