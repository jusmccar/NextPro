"use server";

import { createSchema } from "@/app/schemas/blog";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";
import z from "zod";

export async function createBlogAction(values: z.infer<typeof createSchema>) {
  const parsed = createSchema.safeParse(values);

  if (!parsed.success) {
    throw new Error("Something went wrong");
  }

  const token = await getToken();

  await fetchMutation(
    api.blogs.createBlog,
    {
      content: parsed.data.content,
      title: parsed.data.title,
    },
    { token },
  );

  return redirect("/");
}
