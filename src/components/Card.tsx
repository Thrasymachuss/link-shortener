type Props = {
  children: React.ReactNode;
  title: string;
};

const Card: React.FC<Props> = (props) => {
  return (
    <div className="my-4 w-full border-2 border-violet-800 bg-white p-4">
      <div className="flex flex-col items-center">
        <h2 className="mb-2 text-2xl font-bold">{props.title}</h2>
        {props.children}
      </div>
    </div>
  );
};

export default Card;
