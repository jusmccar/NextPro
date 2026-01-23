import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const createComment = mutation({
  args: {
    content: v.string(),
    blogId: v.id("blogs"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    return await ctx.db.insert("comments", {
      content: args.content,
      authorName: user.name,
      authorId: user._id,
      blogId: args.blogId,
    });
  },
});

export const getCommentsByBlogId = query({
  args: {
    blogId: v.id("blogs"),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("comments")
      .filter((q) => q.eq(q.field("blogId"), args.blogId))
      .order("desc")
      .collect();

    return data;
  },
});
