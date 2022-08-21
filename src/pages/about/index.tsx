import { Card } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
const { Meta } = Card;
/**
 * 关于我们
 */

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="px-40 pt-8">
      <Button
        className="shadow-sm w-24 mb-2 h-10 text-base bg-white text-main font-semibold -translate-y-1"
        onClick={() => {
          navigate("/home");
        }}
      >
        返回
      </Button>
      <div className="mb-12">
        <div className="flex items-center text-2xl font-bold mb-4">
          <div className="bg-main w-3 h-7 mr-2"></div>
          <div>关于我们</div>
        </div>
        <div className="text-base pb-2">文字部分</div>
        <div className="text-base pb-2">文字部分</div>
        <div className="text-base pb-2">文字部分</div>
        <div className="text-base pb-2">文字部分</div>
      </div>
      <div className="mb-12">
        <div className="flex items-center text-2xl font-bold mb-4">
          <div className="bg-main w-3 h-7 mr-2"></div>
          <div>发布推荐</div>
        </div>
        <div className="flex flex-wrap">
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
        </div>
      </div>
    </div>
  );
}
