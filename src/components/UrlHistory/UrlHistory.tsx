import Card from "../Card";
import UrlComponent from "../UrlComponent";
import PageBtn from "../PageBtn";
import useUrlHistory from "./useUrlHistory";

const UrlHistory = () => {
  const {
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
  } = useUrlHistory();

  return (
    <Card title="My Links">
      <div className="flex w-full flex-col justify-between pb-2 sm:flex-row">
        <div className="mb-2 px-4">
          <label htmlFor="searchbar" className="pr-4">
            Search:
          </label>
          <input
            value={search}
            onChange={handleSearchInput}
            type="text"
            id="searchbar"
            className="w-40 rounded border-2"
          />
        </div>
        <div className="mb-2 px-4">
          <label htmlFor="num-per-page" className="pr-4">
            # Per Page:
          </label>
          <input
            value={paginationParams.numPerPage || ""}
            onChange={setNumPerPage}
            type="number"
            id="num-per-page"
            className="w-20 rounded border-2"
          />
        </div>
      </div>
      <div className="w-full pb-4">
        {urlsShowing.map((link, i) => (
          <UrlComponent
            link={link}
            index={i}
            key={link.slug}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
      <div className="flex flex-col items-center py-4">
        <div>
          <div className="pr-4">
            {numPages ? "Pages" : "No Links To Display"}
          </div>
        </div>

        <div className="flex flex-wrap">
          {paginationParams.currentPage > 1 && (
            <>
              <PageBtn clickHandler={minPage}>&lt;&lt;</PageBtn>
              <PageBtn clickHandler={decrementPage}>&lt;</PageBtn>
            </>
          )}
          {showingPages.map((pageNum) => (
            <PageBtn
              key={pageNum}
              clickHandler={() => setPage(pageNum)}
              extraClasses={
                paginationParams.currentPage === pageNum ? "bg-gray-200" : ""
              }
            >
              {pageNum}
            </PageBtn>
          ))}
          {paginationParams.currentPage < numPages && (
            <>
              <PageBtn clickHandler={incrementPage}>&gt;</PageBtn>
              <PageBtn clickHandler={maxPage}>&gt;&gt;</PageBtn>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UrlHistory;
