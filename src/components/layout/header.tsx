import { Button, Carousel, message } from "antd";
import HeaderInput from "./header/input";
import { MailOutlined } from "@ant-design/icons";
import { ForwardedRef, forwardRef, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import User from "./header/user";
import { getAd } from "@/api/work";
import useRequest from "@/hooks/useRequest";
import { AdList } from "@/interface/api";
import { User as UserType } from "@/interface/type";
import Language from "./header/language";

function Head({
  headerContainer,
  user,
}: {
  headerContainer: ForwardedRef<HTMLDivElement>;
  user: UserType;
}) {
  const { data, loading } = useRequest<{
    list: AdList[];
  }>(getAd);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleToPublish = () => {
    if (user.hasLogin) {
      // @ts-ignore
      navegate(`/publish?uid=${user.userInfo.id}`);
    } else {
      import("antd/es/message/index").then((m) => {
        m.default.error("请先登录");
      });
    }
  };

  return (
    <div className="header">
      <div
        className="head flex items-center justify-between px-12 pt-8 pb-6"
        ref={headerContainer}
      >
        <div className=" flex justify-between">
          <Button className="text-main" onClick={handleToPublish}>
            我要发布
          </Button>
          <Button className="text-main left-7 relative   ">版权帮助</Button>
        </div>
        <div className="w-96 ">
          <HeaderInput />
        </div>
        <div className="flex items-center">
          <Language />
          <User />
          <MailOutlined className="text-white text-2xl flex items-center cursor-pointer" />
        </div>
      </div>
      {pathname === "/home" && (
        <div className="flex flex-col items-center w-full py-8">
          <div className="w-2/3 rounded-md h-[300px]">
            <Carousel autoplay style={{ height: 300 }}>
              {!loading &&
                data!.data.list.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex items-center justify-center"
                  >
                    <img src={item.coverUrl} className="w-full h-[300px]" />
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(
  forwardRef((props: { user: UserType }, ref: ForwardedRef<HTMLDivElement>) => (
    <Head {...props} headerContainer={ref} />
  ))
);
