import Card from "../Card";
import LastSubmittedLink from "../LastSubmittedLink";
import useCreateLinkForm from "./useCreateLinkForm";

const CreateLinkForm = () => {
  const {
    formParams,
    slugInUse,
    handleFormInput,
    getRandomSlug,
    handleFormSubmit,
  } = useCreateLinkForm();
  return (
    <Card title="Create A New Link">
      <form onSubmit={handleFormSubmit} className="flex flex-col">
        <input
          className="my-2 border-b-2"
          type="url"
          placeholder="Original URL..."
          value={formParams.url}
          id="url"
          onChange={handleFormInput}
          aria-label="url-input"
          required
        />
        <div className="my-1 flex items-center">
          <span className="mr-1 break-all text-xs sm:text-base">
            {window.location.origin}/
          </span>
          <input
            className={`mr-1 w-full border-b-2 sm:w-80 ${
              slugInUse.data?.valueOf() ? "text-red-700" : ""
            }`}
            type="text"
            placeholder="Slug..."
            id="slug"
            value={formParams.slug}
            onChange={handleFormInput}
            pattern={"^[-a-zA-Z0-9_]+$"}
            title="Only alphanumeric characters and hypens are allowed. No spaces."
            aria-label="slug-input"
            required
          />
          <button
            onClick={getRandomSlug}
            type="button"
            className="rounded bg-blue-500 p-1 text-xs font-bold text-white hover:bg-blue-700 sm:text-base"
          >
            Random
          </button>
        </div>
        {slugInUse.data?.valueOf() && (
          <div className="py-1 text-center text-red-700">
            Slug already in use
          </div>
        )}
        <LastSubmittedLink linkText={formParams.lastSubmittedLink} />
        <button
          type="submit"
          className="mt-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          aria-label="submit-btn"
        >
          Create Link
        </button>
      </form>
    </Card>
  );
};

export default CreateLinkForm;
