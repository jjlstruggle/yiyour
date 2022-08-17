import useLazy from "@/hooks/useLazy";
const Header = useLazy(import("../../../components/user/header"));
import { Button, Pagination } from "antd";
import { getUserPublish } from "../../../api/task";
import { searchWorksByUser } from "../../../api/work";
import { Space, Spin } from "antd";
import { useState, useContext, useEffect } from "react";
import UserContext from "@/context/user";
const ContentLeft = ({
  choose,
  setChoose,
  user,
  setUseWork,
  setUseTask,
}: any) => {
  const onClickButton = async (e: any) => {
    if (e.target.innerText === "任 务" && choose == false) {
      setChoose(true);
      let res = await getUserPublish(1, user.userInfo.id);
      if (res.code == "0") {
        setUseTask(res.data.list);
      }
    } else if (e.target.innerText === "作 品" && choose == true) {
      setChoose(false);
      let res = await searchWorksByUser(1, user.userInfo.id);
      if (res.code == "0") {
        setUseWork(res.data.list);
      }
    }
  };
  return (
    <div
      className="flex flex-col w-32  h-full"
      style={{ borderRight: "2px solid #E2E2E2" }}
    >
      <Button
        onClick={onClickButton.bind(this)}
        style={
          choose
            ? { backgroundColor: "#F6B76C" }
            : { backgroundColor: "#895DC3" }
        }
        className="shadow-xl  w-24 h-10  mt-6 text-white text-base font-semibold"
      >
        任务
      </Button>
      <Button
        onClick={onClickButton.bind(this)}
        style={
          !choose
            ? { backgroundColor: "#F6B76C" }
            : { backgroundColor: "#895DC3" }
        }
        className="shadow-xl w-24 mt-12 h-10 text-white font-semibold"
      >
        作品
      </Button>
    </div>
  );
};
const ContentRight = ({ userWork, userTask, choose }: any) => {
  const data = !choose ? userWork : userTask;
  console.log("useTask", userTask);
  console.log(data);

  return (
    <div className="flex flex-col relative w-full">
      <div
        className="gap-6 grid-cols-4 grid-rows-2 ml-4  grid box-border w-full"
        style={{ padding: "0 4vw 3vh 3vw", height: "95%" }}
      >
        {data ? (
          <>
            {data.map((item: Object) => {
              return (
                <div className="flex rounded-lg bg-white  shadow-lg flex-col">
                  <div className="rounded-lg bg-neutral-400  h-1/2"></div>
                  <div
                    className="h-1/2 flex flex-col justify-around px-3"
                    style={{
                      fontSize: "1.15vw",
                    }}
                  >
                    <div className=" text-black font-semibold">
                      收一份情书模板
                    </div>
                    <div className=" text-zinc-500">2022/5/12 12:00截止</div>
                    <div className=" text-zinc-500">文本/文案</div>
                    <div className="text-main">悬赏：20元</div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <Space
            size="middle"
            className=" absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2"
          >
            <Spin size="large" />
          </Space>
        )}
      </div>
      <Pagination
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          display: "flex",
          transform: "translateX(-50%)",
        }}
        defaultCurrent={1}
        total={500}
      />
    </div>
  );
};
export default function Publish() {
  const [choose, setChoose] = useState(true);
  const [userWork, setUseWork] = useState("");
  const [userTask, setUseTask] = useState("");
  const [page, setPage] = useState({
    current: 1,
    total: 8,
  });
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fn = async () => {
      //@ts-ignore
      let res = await getUserPublish(1, user.userInfo.id);
      if (res.code == "0") {
        console.log(res.data);

        setUseTask(res.data.list);
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
      <Header camera={true} />
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
        <ContentLeft
          choose={choose}
          setUseTask={setUseTask}
          setUseWork={setUseWork}
          setChoose={setChoose}
          user={user}
        />
        <ContentRight choose={choose} userWork={userWork} userTask={userTask} />
      </div>
    </div>
  );
}
