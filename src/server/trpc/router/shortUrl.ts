import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const shortUrlRouter = router({
  getUrls: protectedProcedure.query(async ({ ctx }) => {
    const session = ctx.session;
    const userId = session.user.id ?? "";
    const shortUrls = await ctx.prisma.shortUrl.findMany({
      where: {
        userId,
      },
    });
    return shortUrls;
  }),
  checkInUse: publicProcedure
    .input(z.object({ slug: z.string().nullish() }))
    .query(async ({ input, ctx }) => {
      const slug: string = input.slug ?? "";
      const inUse = await ctx.prisma.shortUrl.findUnique({
        where: {
          slug,
        },
      });
      return !!inUse;
    }),
  createUrl: protectedProcedure
    .input(z.object({ slug: z.string(), url: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { slug, url } = input;
      if (!slug.match(/^[-a-zA-Z0-9_]+$/)) return false;

      const inUse = await ctx.prisma.shortUrl.findUnique({
        where: {
          slug,
        },
      });

      if (inUse) return false;

      const userId = ctx.session.user.id;
      await ctx.prisma.shortUrl.create({
        data: {
          slug,
          url,
          userId,
        },
      });
      return true;
    }),
  deleteUrl: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { slug } = input;
      const shortUrl = await ctx.prisma.shortUrl.findUnique({
        where: {
          slug,
        },
      });
      const userId = ctx.session.user.id;

      if (!shortUrl || shortUrl.userId !== userId) return false;

      await ctx.prisma.shortUrl.delete({
        where: {
          slug,
        },
      });
      return true;
    }),
});
