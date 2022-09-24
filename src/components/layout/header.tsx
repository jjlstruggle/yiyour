import { Button, Carousel, Drawer, Image } from "antd";
import HeaderInput from "./header/input";
import { MailOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { ForwardedRef, forwardRef, memo, useState } from "react";
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
      navigate(`/publish?uid=${user.userInfo.id}`);
    } else {
      import("antd/es/message/index").then((m) => {
        m.default.error("请先登录");
      });
    }
  };
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="header">
        <div className="w-full flex justify-center items-center md:hidden">
          <Image preview={false} src={require("@/assets/backIcon.png")} />
        </div>
        <div
          className="head flex items-center justify-between px-12 pt-8 pb-6 md:pb-4 md:pt-6"
          ref={headerContainer}
        >
          <div className=" flex justify-between md:hidden">
            <Button className="text-main w-32" onClick={handleToPublish}>
              我要发布
            </Button>
            <Button
              className="text-main left-7 relative "
              style={{ visibility: "hidden" }}
            >
              版权帮助
            </Button>
          </div>
          <div className="hidden md:flex md:relative md:-left-8">
            <MenuFoldOutlined
              style={{ fontSize: "22px" }}
              onClick={showDrawer}
            />
            <Drawer
              title={"一隅立画"}
              placement="left"
              width={256}
              drawerStyle={{
                backgroundImage: "linear-gradient(#E2B886, #CE9AC1,#F4C9DB)",
              }}
              onClose={onClose}
              visible={visible}
              className="md:text-white"
            >
              <p
                onClick={() => {
                  navigate("/home");
                  onClose();
                }}
              >
                首页
              </p>
              <p
                onClick={() => {
                  navigate(`/user`);
                  onClose();
                }}
              >
                用户中心
              </p>
              <p
                onClick={() => {
                  navigate("/publish");
                  onClose();
                }}
              >
                我要发布
              </p>
              {/* <p>版权帮助</p> */}
              <p
                onClick={() => {
                  navigate("/about");
                  onClose();
                }}
              >
                关于我们
              </p>
            </Drawer>
          </div>
          <div className="w-96 md:relative md:self-center ">
            <HeaderInput />
          </div>
          <div className="flex items-center md:hidden">
            <Language />
            <User />
            <MailOutlined className="text-white text-2xl flex items-center cursor-pointer" />
          </div>
        </div>
        {pathname === "/home" && (
          <div className="flex flex-col items-center w-full py-8 md:py-0">
            <div className="w-2/3 rounded-md h-[300px] md:w-full md:h-[200px]">
              <Carousel autoplay style={{ height: 300 }}>
                {!loading &&
                  data!.data.list.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="w-full flex items-center justify-center"
                    >
                      <img
                        src={item.coverUrl}
                        className="w-full h-[300px]  md:h-[200px] "
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default memo(
  forwardRef((props: { user: UserType }, ref: ForwardedRef<HTMLDivElement>) => (
    <Head {...props} headerContainer={ref} />
  ))
);
