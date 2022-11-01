import { createContext, Dispatch, SetStateAction } from "react";
import { trpc } from "../utils/trpc";

type UrlQueryType = ReturnType<
  typeof trpc.shortUrl.getUrls.useQuery<"get.shortUrls">
>;
type SearchType = [string, Dispatch<SetStateAction<string>>];
export type QueryContextType = [UrlQueryType, SearchType];

const QueryContext = createContext<QueryContextType | null>(null);
export default QueryContext;
