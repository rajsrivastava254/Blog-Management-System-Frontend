import { useEffect, useState } from "react";
import BlogPost from "@/components/BlogPost";
import PostForm from "@/components/PostForm";
import LoginForm from "@/components/LoginForm";
import BlogHeader from "@/components/BlogHeader";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const DEMO_EMAIL = "demo@vivid.blog";
  const DEMO_PASSWORD = "demo1234";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("auth:isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
    const profileRaw = localStorage.getItem("auth:profile");
    if (profileRaw) {
      try {
        const p = JSON.parse(profileRaw) as { firstName?: string; lastName?: string };
        setFirstName(p.firstName || "");
        setLastName(p.lastName || "");
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:8080/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        const mapped: Post[] = (Array.isArray(data) ? data : []).map((p: any) => ({
          id: String(p.id ?? p._id ?? Math.random().toString(36).slice(2)),
          title: String(p.title ?? "Untitled"),
          content: String(p.content ?? ""),
          tags: Array.isArray(p.tags) ? p.tags : [],
          author: p.user?.name || p.author || "Blog Author",
          date: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
          readTime: "3 min read",
        }));
        setPosts(mapped);
      } catch (e) {
        toast({ title: "Could not load posts", description: "Please try again later.", variant: "destructive" });
      }
    };
    fetchPosts();
  }, [isLoggedIn]);

  const [posts, setPosts] = useState<Post[]>([]);

  const handleLogin = async (email: string, password: string) => {
    const e = email.trim();
    const p = password.trim();

    try {
      const res = await fetch("http://localhost:8080/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const users = await res.json();
      const match = Array.isArray(users)
        ? users.find((u: any) => String(u.email).toLowerCase() === e.toLowerCase() && String(u.password) === p)
        : null;

      const isValid = !!match || (e === DEMO_EMAIL && p === DEMO_PASSWORD);

      if (!isValid) {
        toast({ title: "Invalid credentials", description: "Email or password is incorrect.", variant: "destructive" });
        return;
      }

      setIsLoggedIn(true);
      localStorage.setItem("auth:isLoggedIn", "true");
      localStorage.setItem("auth:sessionEmail", e);
      toast({ title: "Welcome back!", description: "You have successfully signed in to your blog." });
    } catch (err) {
      toast({ title: "Login failed", description: "Could not contact the server.", variant: "destructive" });
    }
  };

  const handleSignup = async (email: string, password: string) => {
    if (!email || !password) {
      toast({ title: "Missing information", description: "Email and password are required.", variant: "destructive" });
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      if (res.status === 409) {
        toast({ title: "Email already registered", description: "Please sign in with this email.", variant: "destructive" });
        return;
      }

      if (!res.ok) {
        let description = "Signup failed. Please try again.";
        try {
          const err = await res.json();
          if (err?.message) description = String(err.message);
        } catch {}
        toast({ title: "Error", description, variant: "destructive" });
        return;
      }

      const savedUser = await res.json();

      // Persist session and switch UI without re-calling login
      const sessionEmail = (savedUser && savedUser.email) ? String(savedUser.email) : email.trim();
      localStorage.setItem("auth:user", JSON.stringify({ email: sessionEmail }));
      localStorage.setItem("auth:isLoggedIn", "true");
      localStorage.setItem("auth:sessionEmail", sessionEmail);
      setIsLoggedIn(true);
      toast({ title: "Account created", description: "You are now signed in." });
    } catch (e) {
      toast({ title: "Network error", description: "Could not reach the server.", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSearchQuery("");
    localStorage.removeItem("auth:isLoggedIn");
    localStorage.removeItem("auth:sessionEmail");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleAddPost = async (newPost: { title: string; content: string; tags: string[] }) => {
    try {
      const res = await fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newPost,
          user: { id: 1 }, // ✅ attach existing user
        }),
      });

      if (!res.ok) throw new Error("Failed to save post");

      const savedPost = await res.json();

      // ✅ Map backend post into frontend format
      const formattedPost: Post = {
        id: savedPost.id.toString(),
        title: savedPost.title,
        content: savedPost.content,
        tags: newPost.tags || [],
        author: "Blog Author",
        date: savedPost.createdAt
          ? new Date(savedPost.createdAt).toLocaleDateString()
          : new Date().toLocaleDateString(),
        readTime: "3 min read",
      };

      setPosts((prev) => [formattedPost, ...prev]);
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not save the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem("auth:profile", JSON.stringify({ firstName, lastName }));
    toast({ title: "Profile saved", description: "Your profile has been updated." });
  };

  const handleCheckUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const users = await res.json();
      const count = Array.isArray(users) ? users.length : 0;
      toast({ title: "Users loaded", description: `Found ${count} users in the system.` });
      console.log("/users response:", users);
    } catch (e) {
      toast({ title: "Could not load users", description: "Check your backend /users API.", variant: "destructive" });
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      (post?.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (post?.content?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (Array.isArray(post?.tags) ? post.tags : []).some((tag) =>
        (tag?.toLowerCase() || "").includes(searchQuery.toLowerCase())
      )
  );

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          {/* Greeting + Profile */}
          <div className="slide-up stagger-1">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>
                  {`Welcome ${firstName ? firstName : localStorage.getItem("auth:sessionEmail") || ""} to the blogging site`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name" />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <Button onClick={handleSaveProfile}>Save Profile</Button>
                  <Button variant="secondary" onClick={handleCheckUsers}>Check Users</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Post Creation Form */}
          <div className="slide-up stagger-1">
            <PostForm onAddPost={handleAddPost} />
          </div>

          {/* Posts Section */}
          <div className="slide-up stagger-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-foreground">
                {searchQuery
                  ? `Search Results (${filteredPosts.length})`
                  : "All Posts"}
              </h2>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 fade-in">
                <p className="text-xl text-muted-foreground">
                  {searchQuery
                    ? "No posts found matching your search."
                    : "No posts yet. Create your first post above!"}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className={`slide-up stagger-${Math.min(index + 3, 6)}`}
                  >
                    <BlogPost
                      title={post.title}
                      content={post.content}
                      author={post.author}
                      date={post.date}
                      readTime={post.readTime}
                      tags={post.tags}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
