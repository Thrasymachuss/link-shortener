import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";

type Props = {
  linkText: string;
};

const useCopyBtn = ({ linkText }: Props) => {
  const [btnClicked, setBtnClicked] = useState(false);
  const resetText = () => setBtnClicked(false);
  const copyText = () => {
    copy(linkText);
    setBtnClicked(true);
  };

  useEffect(() => {
    const id = setTimeout(resetText, 2000);
    return () => clearTimeout(id);
  });

  return { btnClicked, copyText };
};

export default useCopyBtn;
