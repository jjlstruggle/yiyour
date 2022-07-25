import { Card } from "antd";
import { HeartFilled } from "@ant-design/icons";
const { Meta } = Card;

interface GoodCardProps {
  title: string;
  img: string;
  price: number;
  tag: string;
  linked: boolean;
}

export default function GoodCard({}: GoodCardProps) {
  return (
    <Card
      className="mr-12"
      style={{ width: 240 }}
      hoverable
      cover={
        <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
      }
    >
      <Meta title="急需微信头像" description="www.instagram.com" />
      <div className="text-main text-base mt-2">悬赏： 20元</div>
      <div className="absolute right-0 bottom-0 bg-main w-7 h-7 rounded-full flex items-center justify-center text-white">
        <HeartFilled />
      </div>
    </Card>
  );
}
