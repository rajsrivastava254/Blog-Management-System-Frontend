import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PostFormProps {
  onAddPost: (post: { title: string; content: string; tags: string[] }) => void;
}

const PostForm = ({ onAddPost }: PostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);
    
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
      title: "Post created!",
      description: "Your blog post has been published successfully.",
    });
  };

  return (
    <Card className="blog-card slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <PlusCircle className="h-6 w-6 text-primary" />
          Create New Post
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-field">
            <Label htmlFor="title" className="text-sm font-medium mb-2 block">
              Post Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging title for your post..."
              className="border-0 bg-transparent text-lg font-medium"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="content" className="text-sm font-medium mb-2 block">
              Content
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              className="border-0 bg-transparent min-h-[200px] resize-none"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="tags" className="text-sm font-medium mb-2 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags (comma-separated)
            </Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="react, javascript, web development"
              className="border-0 bg-transparent"
            />
          </div>

          <Button type="submit" className="btn-hero w-full text-lg py-6">
            Publish Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;