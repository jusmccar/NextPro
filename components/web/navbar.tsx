"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { SearchInput } from "@/components/web/SearchInput";
import { ThemeToggle } from "@/components/web/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Next<span className="text-primary">Pro</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            className={buttonVariants({
              variant: "ghost",
            })}
            href="/"
          >
            Home
          </Link>
          <Link
            className={buttonVariants({
              variant: "ghost",
            })}
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className={buttonVariants({
              variant: "ghost",
            })}
            href="/create"
          >
            Create
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:block mr-2">
          <SearchInput />
        </div>

        {isLoading || !isAuthenticated ? (
          <>
            <Link className={buttonVariants()} href="/auth/signup">
              Sign Up
            </Link>
            <Link
              className={buttonVariants({
                variant: "outline",
              })}
              href="/auth/login"
            >
              Login
            </Link>
          </>
        ) : (
          <Button
            className={buttonVariants({
              variant: "outline",
            })}
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Logged out successfully");
                    router.push("/");
                  },
                  onError: (error) => {
                    toast.error(error.error.message);
                  },
                },
              })
            }
          >
            Logout
          </Button>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
