import useCopyBtn from "../hooks/useCopyBtn";

type Props = {
  linkText: string;
};

const LastSubmittedLink: React.FC<Props> = ({ linkText }) => {
  const { btnClicked, copyText } = useCopyBtn({ linkText });

  if (!linkText) return <></>;

  return (
    <div className="flex items-center justify-center py-4">
      <span className="mr-2">Your Link:</span>
      <span className="mr-2 break-all text-blue-700 underline">
        <a href={linkText}>{linkText}</a>
      </span>
      <button
        type="button"
        onClick={copyText}
        className="rounded bg-blue-500 p-1 font-bold text-white hover:bg-blue-700"
      >
        {btnClicked ? "Copied" : "Copy"}
      </button>
    </div>
  );
};

export default LastSubmittedLink;
