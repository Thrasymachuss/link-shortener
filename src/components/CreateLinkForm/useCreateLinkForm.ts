import { useState, ChangeEventHandler, FormEventHandler } from "react";
import { trpc } from "../../utils/trpc";
import { nanoid } from "nanoid";
import { useContext } from "react";
import QueryContext, { QueryContextType } from "../../contexts/QueryContext";

const useCreateLinkForm = () => {
  const [formParams, setFormParams] = useState({
    url: "",
    slug: "",
    lastSubmittedLink: "",
  });

  // These three declarations
  const createMutation = trpc.shortUrl.createUrl.useMutation();
  const slugInUse = trpc.shortUrl.checkInUse.useQuery({
    slug: formParams.slug,
  });

  const urlsQuery = useContext(QueryContext) as QueryContextType;

  // Event handlers
  const handleFormInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormParams({
      ...formParams,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const getRandomSlug = () => {
    setFormParams({
      ...formParams,
      slug: nanoid(),
    });
  };

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (slugInUse.data?.valueOf()) return;

    const { slug, url } = formParams;

    new Promise<void>((res) => {
      createMutation.mutate({ slug, url }); // Here
      setFormParams({
        lastSubmittedLink: `${window.location.origin}/${slug}`,
        url: "",
        slug: "",
      });
      setTimeout(() => res(), 500);
    }).then(() => urlsQuery.refetch());
  };

  return {
    formParams,
    slugInUse,
    handleFormInput,
    getRandomSlug,
    handleFormSubmit,
  };
};

export default useCreateLinkForm;
