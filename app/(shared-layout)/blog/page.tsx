import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

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
      <Suspense fallback={<BlogListLoading />}>
        <BlogList />
      </Suspense>
    </div>
  );
}

async function BlogList() {
  const data = await fetchQuery(api.blogs.getBlogs);

  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
      {data?.map((article) => (
        <Card key={article._id} className="pt-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1562749348-ed9e37507658?q=80&w=2696&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image"
              fill
              className="rounded-t-lg"
            />
          </div>

          <CardContent>
            <Link href={`/blog/${article._id}`}>
              <h1 className="text-2xl font-bold hover:text-primary">
                {article.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-3">
              {article.content}
            </p>
          </CardContent>
          <CardFooter>
            <Link
              className={buttonVariants({
                className: "w-full",
              })}
              href={`/blog/${article._id}`}
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function BlogListLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
