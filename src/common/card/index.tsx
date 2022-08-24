import { Card } from "antd";
import { HeartFilled } from "@ant-design/icons";
const { Meta } = Card;

interface GoodCardProps {
  title: string;
  img: string;
  price: number;
  tag: string;
  linked: boolean;
  ddl: string;
}

export default function GoodCard({
  title,
  price,
  ddl,
  tag,
  img,
}: GoodCardProps) {
  return (
    <Card hoverable cover={<img src={img} loading="lazy" />}>
      <Meta title={title} description={ddl} />
      <div className="text-xs text-gray-400">{tag}</div>
      <div className="flex justify-between items-end">
        <div className="text-main text-base mt-2">悬赏： {price}元</div>

        <div className=" bg-main w-7 h-7 rounded-full flex items-center justify-center text-white">
          <HeartFilled />
        </div>
      </div>
    </Card>
  );
}
