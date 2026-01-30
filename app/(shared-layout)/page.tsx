import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Read. Write. <span className="text-primary">Inspire.</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A minimalist space for developers to share their journey and learn
          from others.
        </p>
        <div className="pt-4">
          <Link
            href="/create"
            className={buttonVariants({
              size: "lg",
              className: "rounded-full",
            })}
          >
            Start Writing
          </Link>
        </div>
      </section>
    </div>
  );
}
