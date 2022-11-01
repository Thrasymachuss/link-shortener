import { ShortUrl } from "@prisma/client";
import useCopyBtn from "../hooks/useCopyBtn";

type Props = {
  link: ShortUrl;
  index: number;
  deleteHandler: (link: ShortUrl) => void;
};

const UrlComponent: React.FC<Props> = ({
  link,
  index,
  deleteHandler,
}: Props) => {
  const linkText = `${window.location.origin}/${link.slug}`;
  const { btnClicked, copyText } = useCopyBtn({ linkText });
  return (
    <div
      key={index}
      className={`flex w-full justify-between border-b-2 p-4 ${
        index === 0 ? "border-t-2" : ""
      }`}
    >
      <div className="break-all">
        <a href={link.url}>{`/${link.slug}`}</a>
      </div>
      <div className="flex px-2">
        <div className="flex items-center justify-center">
          <button
            onClick={copyText}
            className="mr-1 rounded bg-green-500 p-1 font-bold text-white hover:bg-green-700"
          >
            {btnClicked ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => deleteHandler(link)}
            className="rounded bg-red-500 p-1 font-bold text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrlComponent;
