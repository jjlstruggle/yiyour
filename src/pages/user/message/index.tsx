import useLazy from "@/hooks/useLazy";
const Header = useLazy(import("../../../components/user/header"));
import { Input, Button, Avatar, message, Upload, Pagination } from "antd";
import { useState, useEffect } from "react";
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
const ContentRight = () => {
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
        <div
          className="flex "
          style={{ borderBottom: "1px solid #CCCCCC", padding: "1.5vh 2vw" }}
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
        <div
          className="flex "
          style={{ borderBottom: "1px solid #CCCCCC", padding: "1.5vh 2vw" }}
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
        <div
          className="flex "
          style={{ borderBottom: "1px solid #CCCCCC", padding: "1.5vh 2vw" }}
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
        <div
          className="flex "
          style={{ borderBottom: "1px solid #CCCCCC", padding: "1.5vh 2vw" }}
        >
          <Avatar size={64} />
          <div className="text-blank text-xl ml-8 flex flex-col justify-around">
            <div className="flex justify-between">
              <div className=" font-semibold">一隅立画</div>
              <div className="text-stone-400">2022/05/01</div>
            </div>
            <div className=" font-semibold text-base">
              你发布的作品xxxxxx已过审！
            </div>
          </div>
        </div>
        <div
          className="flex "
          style={{ borderBottom: "1px solid #CCCCCC", padding: "1.5vh 2vw" }}
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
      </div>

      <Pagination
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          display: "flex",
          transform: "translateX(-50%)",
        }}
        defaultCurrent={6}
        total={500}
      />
    </div>
  );
};
export default function Message() {
  const [choose, setChoose] = useState({
    all: true,
    system: false,
    user: false,
  });
  useEffect(() => {
    let token: any = localStorage.getItem("token");
    var ws = new WebSocket("ws:47.96.86.132:88/api-websocket/chat", [token]);
    console.log(ws.readyState);

    ws.onopen = function () {
      console.log("ws连接状态：" + ws.readyState);
      console.log(1123);

      ws.send("test1");
    };
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#F7F7F7",
        height: "100vh",
        padding: "4vh 5vw",
      }}
    >
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
        <ContentRight />
      </div>
    </div>
  );
}
