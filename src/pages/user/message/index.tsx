import useLazy from "@/hooks/useLazy";
const Header = useLazy(import("../../../components/user/header"));
import { Input, Button, Avatar, message, Upload, Pagination } from "antd";
import { useState, useEffect, useContext } from "react";
import { getMes } from "../../../api/user";
import UserContext from "@/context/user";
import { Space, Spin } from "antd";
import { useNavigate } from "react-router-dom";
const ContentLeft = ({ choose, setChoose }: any) => {
  const onclickBut = (e: any) => {
    if (e.target.innerText === "全部消息" && choose.all !== true) {
      setChoose({
        all: true,
        system: false,
        user: false,
      });
    } else if (e.target.innerText === "系统消息" && choose.system !== true) {
      setChoose({
        all: false,
        system: true,
        user: false,
      });
    } else if (e.target.innerText === "用户消息" && choose.user !== true) {
      setChoose({
        all: false,
        system: false,
        user: true,
      });
    }
  };
  return (
    <div
      className="flex flex-col w-32  h-full"
      style={{ borderRight: "2px solid #E2E2E2" }}
    >
      <Button
        onClick={onclickBut.bind(this)}
        className="shadow-xl  w-24 h-10  mt-6 text-white text-base font-semibold"
        style={
          choose.all
            ? { backgroundColor: "#F6B76C" }
            : { backgroundColor: "#895DC3" }
        }
      >
        全部消息
      </Button>
      <Button
        onClick={onclickBut.bind(this)}
        className="shadow-xl  w-24 mt-12 h-10 text-white font-semibold"
        style={
          choose.system
            ? { backgroundColor: "#F6B76C" }
            : { backgroundColor: "#895DC3" }
        }
      >
        系统消息
      </Button>
      <Button
        onClick={onclickBut.bind(this)}
        className="shadow-xl w-24 mt-12 h-10 text-white font-semibold"
        style={
          choose.user
            ? { backgroundColor: "#F6B76C" }
            : { backgroundColor: "#895DC3" }
        }
      >
        用户消息
      </Button>
    </div>
  );
};
const ContentRight = ({
  mesAllData,
  mesSystemData,
  mesUserData,
  pageData,
  setPageData,
  setMesAllData,
  setMesSystemData,
  setMesUserData,
  choose,
  user,
}: any) => {
  const onPageChange = async (page: number, pageSize: number) => {
    console.log(page);
    if (choose.all) {
      let res = await getMes(page, user.userInfo.id);
      if (res.code == "0") {
        setMesAllData(res.data.list);
      }
    } else if (choose.system) {
      let res = await getMes(page, user.userInfo.id);
      if (res.code == "0") {
        setMesSystemData(res.data.list);
      }
    } else if (choose.user) {
      let res = await getMes(page, user.userInfo.id);
      if (res.code == "0") {
        setMesUserData(res.data.list);
      }
    }
  };
  const mesRender = (): any => {
    let fn = async () => {
      let data: any = [];
      if (choose.all) {
        data = mesAllData;
      } else if (choose.system) {
        data = mesSystemData;
      } else if (choose.user) {
        data = mesUserData;
      }

      {
        data ? (
          <>
            {data.map((item: any) => {
              return (
                <div
                  className="flex "
                  style={{
                    borderBottom: "1px solid #CCCCCC",
                    padding: "1.5vh 2vw",
                  }}
                >
                  <Avatar size={64} />
                  <div className="text-blank text-xl ml-8 flex flex-col justify-around">
                    <div className="flex justify-between">
                      <div className=" font-semibold">一云立画</div>
                      <div className="text-stone-400">2022/05/01</div>
                    </div>
                    <div className=" font-semibold text-base">
                      你发布的作品xxxxxx已过审！
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          () => {
            return (
              <Space
                size="middle"
                className=" absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2"
              >
                <Spin size="large" />
              </Space>
            );
          }
        );
      }
    };
    fn();
  };
  return (
    <div className="flex flex-col relative w-full">
      <div
        className="w-full box-border  ml-4"
        style={{
          padding: "0 4vw 3vh 3vw",
          height: "95%",
          letterSpacing: "1px",
        }}
      >
        {mesRender()}
      </div>

      <Pagination
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          display: "flex",
          transform: "translateX(-50%)",
        }}
        onChange={onPageChange}
        current={pageData.current}
        defaultPageSize={5}
        total={pageData.total}
      />
    </div>
  );
};
export default function Message() {
  const navigate = useNavigate();
  const [choose, setChoose] = useState({
    all: true,
    system: false,
    user: false,
  });
  const [mesAllData, setMesAllData] = useState();
  const [mesSystemData, setMesSystemData] = useState();
  const [mesUserData, setMesUserData] = useState();
  const [pageData, setPageData] = useState({
    current: 1,
    total: 5,
  });
  const { user } = useContext(UserContext);
  useEffect(() => {
    let token: any = localStorage.getItem("token");
    var ws = new WebSocket("ws://121.40.19.111:88/api-websocket/chat", token);
    console.log(ws.readyState);

    ws.onopen = function () {
      console.log("ws连接状态：" + ws.readyState);
      console.log(1123);

      ws.send("test1");
    };
  }, []);
  useEffect(() => {
    let fn = async () => {
      if (choose.all) {
        //@ts-ignore
        let res = await getMes(1, user.userInfo.id);
        if (res.code == "0") {
          setPageData({
            current: 1,
            total: res.data.totalCount,
          });
          console.log(res.data.totalCount);
        }
      } else if (choose.system) {
      } else if (choose.user) {
      }
    };
    fn();
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#F7F7F7",
        height: "100vh",
        padding: "4vh 5vw",
      }}
    >
      <Button
        className="shadow-sm w-24 mb-2 h-10 bg-white text-main font-semibold -translate-y-1"
        onClick={() => {
          navigate("/home");
        }}
      >
        返回
      </Button>
      <Header message={true} />
      <div
        className="flex  mt-6 h-4/5"
        style={{
          backgroundColor: "#FFFFFF",
          padding: "2.6vh 2.2vw",
          borderRadius: "12px",
          boxShadow: "6px 6px 12px #DEDEDE",
          border: "1px solid  #DEDEDE",
        }}
      >
        <ContentLeft choose={choose} setChoose={setChoose} />
        <ContentRight
          mesAllData={mesAllData}
          mesSystemData={mesSystemData}
          mesUserData={mesUserData}
          pageData={pageData}
          setPageData={setPageData}
          setMesAllData={setMesAllData}
          setMesSystemData={setMesSystemData}
          setMesUserData={setMesUserData}
          choose={choose}
          user={user}
        />
      </div>
    </div>
  );
}
