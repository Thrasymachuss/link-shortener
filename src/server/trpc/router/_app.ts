import { router } from "../trpc";
import { authRouter } from "./auth";
import { shortUrlRouter } from "./shortUrl";

export const appRouter = router({
  shortUrl: shortUrlRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
