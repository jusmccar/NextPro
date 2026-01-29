"use server";

import { createSchema } from "@/app/schemas/blog";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function createBlogAction(values: z.infer<typeof createSchema>) {
  try {
    const parsed = createSchema.safeParse(values);

    if (!parsed.success) {
      throw new Error("Something went wrong");
    }

    const token = await getToken();

    const imageUrl = await fetchMutation(
      api.blogs.generateImageUploadUrl,
      {},
      { token }
    );

    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });

    if (!uploadResult) {
      return {
        error: "Failed to upload image",
      };
    }

    const { storageId } = await uploadResult.json();

    await fetchMutation(
      api.blogs.createBlog,
      {
        title: parsed.data.title,
        content: parsed.data.content,
        imageStorageId: storageId,
      },
      { token }
    );
  } catch {
    return {
      error: "Failed to create blog",
    };
  }

  updateTag("blog");
  return redirect("/blog");
}
