import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { API_BASE, authHeader, getToken } from "@/lib/api";

interface Props {
  postId: string;
  onAdded?: () => void;
}

const CommentForm = ({ postId, onAdded }: Props) => {
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const token = getToken();
    if (!token) {
      toast({ title: "Not authenticated", description: "Please login to post comments.", variant: "destructive" });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(authHeader() as any) },
        body: JSON.stringify({ postId, content: content.trim() }),
      });

      if (res.status === 401) {
        toast({ title: "Session expired", description: "Please login again.", variant: "destructive" });
        return;
      }

      if (!res.ok) throw new Error("Failed to post comment");

      setContent("");
      toast({ title: "Comment added" });
      onAdded?.();
    } catch (err) {
      toast({ title: "Could not add comment", description: "Try again later.", variant: "destructive" });
    }
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write a comment..." />
      <div className="flex justify-end">
        <Button type="submit">Post Comment</Button>
      </div>
    </form>
  );
};

export default CommentForm;
