import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import { useToast } from "@/hooks/use-toast";
import { API_BASE, authHeader } from "@/lib/api";

const PostDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<any>(location.state ?? null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      if (post) return;
      try {
        const res = await fetch(`${API_BASE}/posts/${id}`, { headers: { ...(authHeader() as any) } });
        if (res.status === 404) {
          toast({ title: "Post not found", variant: "destructive" });
          navigate("/");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        toast({ title: "Could not load post", variant: "destructive" });
      }
    };
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!post) return <div className="container mx-auto p-4">Loading post...</div>;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{post.title || post?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">By {post.author || post.user?.name || post.user?.email}</div>
          <div className="whitespace-pre-wrap">{post.content || post?.content}</div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <CommentForm postId={String(id)} onAdded={() => setRefresh((s) => s + 1)} />
        </div>

        <div>
          <CommentList postId={String(id)} refreshToggle={refresh} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
