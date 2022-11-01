type Props = {
  clickHandler: () => void;
  extraClasses?: string;
  children: React.ReactNode;
};

const PageBtn: React.FC<Props> = ({ clickHandler, extraClasses, children }) => {
  return (
    <div
      onClick={clickHandler}
      className={`m-1 cursor-pointer border-2 p-2 ${extraClasses}`}
    >
      {children}
    </div>
  );
};

export default PageBtn;
