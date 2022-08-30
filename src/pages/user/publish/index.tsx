import useLazy from "@/hooks/useLazy";
const Header = useLazy(import("../../../components/user/header"));
import { Button, Pagination } from "antd";
import { getUserPublish } from "../../../api/task";
import { searchWorksByUser } from "../../../api/work";
import { Space, Spin } from "antd";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "@/context/user";
type page = {
  current: number;
  total: number;
};
interface ContentRightParams {
  userWork: any;
  userTask: any;
  choose: Boolean;
  page: page;
  user: any;
  setUseTask: any;
  setUseWork: any;
  setPage: any;
}
const ContentLeft = ({
  choose,
  setChoose,
  user,
  setUseWork,
  setUseTask,
  setPage,
}: any) => {
  const onClickButton = async (e: any) => {
    if (e.target.innerText === "任 务" && choose == false) {
      setChoose(true);
      let res = await getUserPublish(1, user.userInfo.id);
      if (res.code == "0") {
        setUseTask(res.data.list);
        setPage({
          current: 1,
          total: res.data.totalCount,
        });
      }
    } else if (e.target.innerText === "作 品" && choose == true) {
      setChoose(false);
      let res = await searchWorksByUser(1, user.userInfo.id);
      if (res.code == "0") {
        setUseWork(res.data.list);
        setPage({
          current: 1,
          total: res.data.totalCount,
        });
      }
    }
  };
  return (
    <div
      className="flex flex-col w-32   h-full md:flex md:flex-row  md:border-b-2  md:px-8  md:w-full md:h-20 md:justify-between md:items-center   md:border-gray-300"
      style={{ borderRight: "2px solid #E2E2E2" }}
    >
      <Button
        onClick={onClickButton.bind(this)}
        style={
          choose
            ? { backgroundColor: "#F6B76C" }
            : { backgroundColor: "#895DC3" }
        }
        className="shadow-xl  w-24 h-10  mt-6 text-white text-base font-semibold md:mt-0"
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
        className="shadow-xl w-24 mt-12 h-10 text-white font-semibold md:mt-0"
      >
        作品
      </Button>
    </div>
  );
};
const ContentRight = ({
  userWork,
  userTask,
  choose,
  page,
  user,
  setUseTask,
  setUseWork,
  setPage,
}: ContentRightParams) => {
  const data = !choose ? userWork : userTask;
  const onPageChange = async (page: number, pageSize: number) => {
    console.log(page);
    if (choose) {
      console.log("right");

      let res = await getUserPublish(page, user.userInfo.id);
      if (res.code == "0") {
        setUseTask(res.data.list);
        setPage({
          current: page,
          total: res.data.totalCount,
        });
      }
    } else {
      console.log("false");
      let res = await searchWorksByUser(page, user.userInfo.id);
      if (res.code == "0") {
        setUseWork(res.data.list);
        setPage({
          current: page,
          total: res.data.totalCount,
        });
      }
    }
  };
  return (
    <div className="flex flex-col relative w-full">
      <div
        className="gap-6 grid-cols-4 grid-rows-2 ml-4  grid box-border w-full md:grid-cols-1 md:grid-rows-8   md:mt-8 md:mx-auto"
        style={{ padding: "0 4vw 3vh 3vw", height: "95%" }}
      >
        {data ? (
          <>
            {data.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex rounded-lg bg-white  shadow-lg flex-col"
                >
                  <img
                    src={item.taskPicture}
                    className="rounded-lg bg-neutral-400  h-1/2"
                  ></img>
                  <div
                    className="h-1/2 flex flex-col justify-around px-3"
                    style={{
                      fontSize: "1.15vw",
                    }}
                  >
                    <div className=" text-black font-semibold">
                      {item.taskName}
                    </div>
                    <div className=" text-zinc-500">
                      {item.taskDeadline}截止
                    </div>
                    <div className=" text-zinc-500">{item.type}</div>
                    <div className="text-main">悬赏：{item.taskPrice}元</div>
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
        onChange={onPageChange}
        // current={page.current}
        pageSize={8}
        total={page.total}
        current={page.current}
      />
    </div>
  );
};
export default function Publish() {
  const navigate = useNavigate();
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
        setPage({
          current: 1,
          total: res.data.totalCount,
        });
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
      className="md:mb-4 "
    >
      <Button
        className="shadow-sm w-24 mb-2 h-10 text-base bg-white text-main font-semibold -translate-y-1"
        onClick={() => {
          navigate("/home");
        }}
      >
        返回
      </Button>
      <Header camera={true} />
      <div
        className="flex  mt-6 h-4/5 md:flex-col"
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
          setPage={setPage}
        />
        <ContentRight
          page={page}
          choose={choose}
          userWork={userWork}
          userTask={userTask}
          user={user}
          setUseTask={setUseTask}
          setUseWork={setUseWork}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
