import React, { useEffect, useState } from "react";
import { API_BASE, authHeader } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
}

interface Comment {
  id: string;
  content: string;
  user: User;
  createdAt: string;
}

interface Props {
  postId: string;
  refreshToggle?: number;
}

const CommentList = ({ postId, refreshToggle }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const sessionEmail = localStorage.getItem("auth:sessionEmail") || null;

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/comments/post/${postId}`, {
        headers: { ...(authHeader() as any) },
      });
      if (res.status === 401) {
        toast({ title: "Unauthorized", description: "Please login.", variant: "destructive" });
        navigate("/");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      toast({ title: "Could not load comments", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, refreshToggle]);

  const startEdit = (c: Comment) => {
    setEditingId(c.id);
    setEditContent(c.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...(authHeader() as any) },
        body: JSON.stringify({ content: editContent }),
      });
      if (res.status === 403) {
        toast({ title: "Forbidden", description: "You are not the owner.", variant: "destructive" });
        return;
      }
      if (res.status === 401) {
        toast({ title: "Unauthorized", description: "Please login.", variant: "destructive" });
        navigate("/");
        return;
      }
      if (!res.ok) throw new Error("Failed to update");
      toast({ title: "Comment updated" });
      cancelEdit();
      fetchComments();
    } catch (err) {
      toast({ title: "Could not update comment", variant: "destructive" });
    }
  };

  const deleteComment = async (id: string) => {
    if (!confirm("Delete this comment?")) return;
    try {
      const res = await fetch(`${API_BASE}/comments/${id}`, {
        method: "DELETE",
        headers: { ...(authHeader() as any) },
      });
      if (res.status === 403) {
        toast({ title: "Forbidden", description: "You are not the owner.", variant: "destructive" });
        return;
      }
      if (res.status === 401) {
        toast({ title: "Unauthorized", description: "Please login.", variant: "destructive" });
        navigate("/");
        return;
      }
      if (res.status !== 204) throw new Error("Failed to delete");
      toast({ title: "Comment deleted" });
      fetchComments();
    } catch (err) {
      toast({ title: "Could not delete comment", variant: "destructive" });
    }
  };

  if (loading) return <div>Loading comments...</div>;

  return (
    <div className="space-y-3">
      {comments.length === 0 ? (
        <div className="text-muted-foreground">No comments yet.</div>
      ) : (
        comments.map((c) => (
          <Card key={c.id}>
            <CardContent>
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="text-sm font-medium">{c.user?.email}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {new Date(c.createdAt).toLocaleString()}
                  </div>

                  {editingId === c.id ? (
                    <div>
                      <textarea className="w-full p-2 border rounded" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                      <div className="flex gap-2 mt-2">
                        <Button onClick={() => saveEdit(c.id)}>Save</Button>
                        <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{c.content}</div>
                  )}
                </div>

                {c.user?.email === sessionEmail && (
                  <div className="flex flex-col gap-2">
                    <Button size="sm" onClick={() => startEdit(c)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteComment(c.id)}>Delete</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default CommentList;
