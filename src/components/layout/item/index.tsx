interface ItemProps {
  mainTitle: string;
  item: {
    content: string;
    url: string;
  }[];
}

export default function Item(props: ItemProps) {
  return (
    <div className="mr-16">
      <div className="text-base text-white mb-2 font-bold">
        {props.mainTitle}
      </div>
      {props.item.map((item, index) => (
        <div className="text-gray-300 my-1" key={index}>
          {item.content}
        </div>
      ))}
    </div>
  );
}
