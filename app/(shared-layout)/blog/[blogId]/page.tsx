import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogIdPageProps {
  params: Promise<{
    blogId: Id<"blogs">;
  }>;
}

export default async function BlogIdPage({ params }: BlogIdPageProps) {
  const { blogId } = await params;

  const [blog, preloadedComments] = await Promise.all([
    await fetchQuery(api.blogs.getBlogById, { blogId: blogId }),
    await preloadQuery(api.comments.getCommentsByBlogId, {
      blogId: blogId,
    }),
  ]);

  if (!blog) {
    return (
      <div>
        <h1 className="text-6xl font-extrabold text-red-500 py-20">
          No post found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link
        className={buttonVariants({ variant: "outline", className: "mb-4" })}
        href="/blog"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>
      <div className="w-full h-100 mb-8 rounded-xl overflow-hidden shadow-sm relative">
        <Image
          src={
            blog.imageUrl ??
            "https://images.unsplash.com/photo-1562749348-ed9e37507658?q=80&w=2696&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={blog.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {blog.title}
        </h1>

        <p className="text-sm text-muted-foreground">
          Created on: {new Date(blog._creationTime).toLocaleDateString("en-US")}
        </p>

        <Separator className="my-8" />

        <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {blog.content}
        </p>

        <Separator className="my-8" />

        <CommentSection preloadedComments={preloadedComments} />
      </div>
    </div>
  );
}
