import { createContext } from "react";
import { trpc } from "../utils/trpc";

export type QueryContextType = ReturnType<
  typeof trpc.shortUrl.getUrls.useQuery<void>
>;
const QueryContext = createContext<QueryContextType | null>(null);
export default QueryContext;
