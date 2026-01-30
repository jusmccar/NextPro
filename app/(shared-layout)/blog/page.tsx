import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughts, and trends from our team.
        </p>
      </div>
      <BlogList />
    </div>
  );
}

async function BlogList() {
  "use cache";
  cacheLife("hours");
  cacheTag("blog");

  const blogs = await fetchQuery(api.blogs.getBlogs);

  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
      {blogs?.map((blog) => (
        <Card key={blog._id} className="pt-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={
                blog.imageUrl ??
                "https://images.unsplash.com/photo-1562749348-ed9e37507658?q=80&w=2696&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="image"
              fill
              className="rounded-t-lg object-cover"
            />
          </div>

          <CardContent>
            <Link href={`/blog/${blog._id}`}>
              <h1 className="text-2xl font-bold hover:text-primary">
                {blog.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-3">{blog.content}</p>
          </CardContent>
          <CardFooter>
            <Link
              className={buttonVariants({
                className: "w-full",
              })}
              href={`/blog/${blog._id}`}
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
