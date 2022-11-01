import { useState, useContext, ChangeEventHandler } from "react";
import { trpc } from "../../utils/trpc";
import { ShortUrl } from "@prisma/client";
import QueryContext, { QueryContextType } from "../../contexts/QueryContext";

const useUrlHistory = () => {
  const [paginationParams, setPaginationParams] = useState({
    numPerPage: 10,
    currentPage: 1,
  });
  const [search, setSearch] = useState("");

  // TRPC
  const urlsQuery = useContext(QueryContext) as QueryContextType;
  const deleteMutation = trpc.shortUrl.deleteUrl.useMutation();

  // Pagination -- handle which urls are showing
  const urls =
    urlsQuery.data?.filter((url) => url.slug.includes(search)).reverse() ?? [];
  const numPerPage = paginationParams.numPerPage || 1;
  const skip = numPerPage * (paginationParams.currentPage - 1);
  const urlsShowing = urls.slice(skip, skip + numPerPage);

  // Pagination -- handle which page btns are showing
  const numPages = Math.ceil(urls.length / numPerPage);
  const pages = Array(numPages)
    .fill(1)
    .map((item, i) => item * (i + 1));
  // Show 2 pages on either side of current page, if they exist
  // Indices which start at 0, but page nums start at 1
  const showingPagesStart = Math.max(paginationParams.currentPage - 3, 0);
  const showingPagesEnd = Math.min(paginationParams.currentPage + 2, numPages);
  const showingPages = pages.slice(showingPagesStart, showingPagesEnd);

  // Event handlers
  const incrementPage = () => {
    setPaginationParams({
      ...paginationParams,
      currentPage:
        paginationParams.currentPage < 1
          ? 1
          : paginationParams.currentPage >= numPages
          ? numPages
          : paginationParams.currentPage + 1,
    });
  };
  const decrementPage = () => {
    setPaginationParams({
      ...paginationParams,
      currentPage:
        paginationParams.currentPage <= 1
          ? 1
          : paginationParams.currentPage > numPages
          ? numPages
          : paginationParams.currentPage - 1,
    });
  };
  const setPage = (pageNum: number) => {
    setPaginationParams({
      ...paginationParams,
      currentPage: pageNum,
    });
  };
  const minPage = () => setPage(1);
  const maxPage = () => setPage(numPages);

  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.currentTarget.value);
    setPaginationParams({
      ...paginationParams,
      currentPage: 1,
    });
  };

  const setNumPerPage: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPaginationParams({
      ...paginationParams,
      currentPage: 1,
      numPerPage:
        Number(e.currentTarget.value) >= 0 ? Number(e.currentTarget.value) : 0,
    });

  const deleteHandler = (link: ShortUrl) => {
    new Promise<void>((res) => {
      deleteMutation.mutate({ slug: link.slug });
      setTimeout(() => res(), 500);
    }).then(() => urlsQuery.refetch());
  };

  return {
    search,
    paginationParams,
    urlsShowing,
    numPages,
    showingPages,
    incrementPage,
    decrementPage,
    setPage,
    minPage,
    maxPage,
    handleSearchInput,
    setNumPerPage,
    deleteHandler,
  };
};

export default useUrlHistory;
