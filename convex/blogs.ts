import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const createBlog = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    const blogArtticle = await ctx.db.insert("blogs", {
      title: args.title,
      content: args.content,
      authorId: user._id,
      imageStorageId: args.imageStorageId,
    });

    return blogArtticle;
  },
});

export const getBlogs = query({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db.query("blogs").order("desc").collect();

    return await Promise.all(
      blogs.map(async (blog) => {
        const resolvedImageUrl =
          blog.imageStorageId !== undefined
            ? await ctx.storage.getUrl(blog.imageStorageId)
            : null;

        return {
          ...blog,
          imageUrl: resolvedImageUrl,
        };
      })
    );
  },
});

export const getBlogById = query({
  args: {
    blogId: v.id("blogs"),
  },
  handler: async (ctx, args) => {
    const blog = await ctx.db.get(args.blogId);

    if (!blog) {
      return null;
    }

    const resolvedImageUrl =
      blog?.imageStorageId !== undefined
        ? await ctx.storage.getUrl(blog.imageStorageId)
        : null;

    return {
      ...blog,
      imageUrl: resolvedImageUrl,
    };
  },
});

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    return await ctx.storage.generateUploadUrl();
  },
});
