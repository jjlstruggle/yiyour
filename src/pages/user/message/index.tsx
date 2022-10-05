import useLazy from "@/hooks/useLazy";
const Header = useLazy(import("../../../components/user/header"));
const HeaderBack = useLazy(import("@/components/user/headerback"));
import { Input, Button, Avatar, message, Upload, Pagination } from "antd";
import { useState, useEffect, useContext, useLayoutEffect, useId } from "react";
import UserContext from "@/context/user";
import DialogContext from "@/context/dialog";
import { Space, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllMes } from "@/api/mes";
const Dialog = useLazy(import("./dialog/index"));
const ContentLeft = ({
  choose,
  setChoose,
  setRenderData,
  setPageData,
}: any) => {
  const onclickBut = (e: any) => {
    if (e.target.innerText === "全部消息" && choose.all !== true) {
      setChoose({
        all: true,
        system: false,
        user: false,
      });
      (async () => {
        let res = await getAllMes(1);
        if (res.code == "0") {
          setRenderData(res.data.list);
          setPageData({
            current: 1,
            total: res.data.totalCount,
          });
        }
      })();
    } else if (e.target.innerText === "系统消息" && choose.system !== true) {
      setChoose({
        all: false,
        system: true,
        user: false,
      });
      (async () => {
        let res = await getAllMes(1);
        if (res.code == "0") {
          let data = res.data.list.filter((item: any) => item.isSystem == 1);
          console.log(res.data);

          setRenderData(data);
          setPageData({
            current: 1,
            total: res.data.totalCount,
          });
        }
      })();
    } else if (e.target.innerText === "用户消息" && choose.user !== true) {
      setChoose({
        all: false,
        system: false,
        user: true,
      });
      (async () => {
        let res = await getAllMes(1);
        if (res.code == "0") {
          let data = res.data.list.filter((item: any) => item.isSystem == 0);
          setRenderData(data);
          setPageData({
            current: 1,
            total: res.data.totalCount,
          });
        }
      })();
    }
  };
  return (
    <div
      className="flex flex-col w-32   h-full md:flex md:flex-row  md:border-b-2  md:px-8  md:w-[100vw] md:h-20  md:justify-evenly  md:items-center   md:border-gray-300"
      style={{ borderRight: "2px solid #E2E2E2" }}
    >
      <Button
        onClick={onclickBut.bind(this)}
        className="shadow-xl  w-24 h-10  mt-6 text-white text-base font-semibold md:mt-0"
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
        className="shadow-xl w-24 mt-12 h-10 text-white font-semibold md:mt-0"
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
        className="shadow-xl w-24 mt-12 h-10 text-white font-semibold md:mt-0"
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
  pageData,
  setPageData,
  choose,
  user,
  setToUserId,
  dispatchDialogInfo,
  renderData,
  setRenderData,
}: any) => {
  useLayoutEffect(() => {
    let fn = async () => {
      let res = await getAllMes(1);
      if (res.code == "0") {
        setRenderData(res.data.list);
        setPageData({
          current: 1,
          total: res.data.totalCount,
        });
      }
    };
    fn();
  }, []);
  const clickMesBox = (id: any) => {
    (async () => {
      await setToUserId(id);
      dispatchDialogInfo({ open: true });
    })();
  };
  const onPageChange = async (page: number, pageSize: number) => {
    console.log(page, pageSize);
    if (choose.all) {
      let res = await getAllMes(page);
      console.log(res);

      if (res.code == "0") {
        console.log(123);

        setRenderData(res.data.list);
        setPageData({
          current: res.data.currPage,
          total: res.data.totalCount,
        });
      }
    } else if (choose.system) {
      console.log("system");

      let res = await getAllMes(page);
      if (res.code == "0") {
        let data = res.data.list.filter((item: any) => item.isSystem == 1);
        console.log(res.data);

        setRenderData(data);
        setPageData({
          current: page,
          total: res.data.totalCount,
        });
      }
    } else if (choose.user) {
      console.log("user");
      let res = await getAllMes(page);
      if (res.code == "0") {
        let data = res.data.list.filter((item: any) => item.isSystem == 0);
        setRenderData(data);
        setPageData({
          current: page,
          total: res.data.totalCount,
        });
      }
    }
  };

  return (
    <div className="flex flex-col relative w-full">
      <div
        className="w-full box-border  ml-4 md:ml-0 md:min-h-[200px] md:mb-6"
        style={{
          padding: "0 4vw 3vh 3vw",
          height: "95%",
          letterSpacing: "1px",
        }}
      >
        {renderData ? (
          <>
            {renderData.map((item: any, index: number) => {
              let sendTime = item.sendTime
                .replace(/(\-)/g, "/")
                .match(/\d*.\d*.\d*....../);
              return (
                <div
                  key={index}
                  // ts-ignore
                  onClick={() => {
                    clickMesBox(item.fromUserId);
                  }}
                  className="flex hover:cursor-pointer "
                  style={{
                    borderBottom: "1px solid #CCCCCC",
                    padding: "1.5vh 2vw",
                  }}
                >
                  <Avatar className="md:hidden" size={64} />
                  <div className="text-blank text-xl ml-8 flex flex-col justify-around">
                    <div className="flex justify-between">
                      <div className=" font-semibold">{item.fromUserId}</div>
                      <div className=" md:text-sm text-stone-400 ml-5">
                        {sendTime}
                      </div>
                    </div>
                    <div className=" font-semibold text-base">
                      {item.content}
                    </div>
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
        hideOnSinglePage={true}
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
  const { dialog, dispatchDialogInfo } = useContext(DialogContext);
  const [toUserId, setToUserId] = useState("");
  const [choose, setChoose] = useState({
    all: true,
    system: false,
    user: false,
  });
  const [pageData, setPageData] = useState({
    current: 1,
    total: 5,
  });
  const { user } = useContext(UserContext);
  const [renderData, setRenderData] = useState([]);
  useEffect(() => {
    let fn = async () => {
      if (choose.all) {
        //@ts-ignore
        let res = await getAllMes(1, user.userInfo.id);
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
    <>
      <HeaderBack />
      <div
        style={{
          backgroundColor: "#F7F7F7",
          height: "100vh",
          padding: "4vh 5vw",
        }}
        className="md:mb-4 md:h-auto "
      >
        <Button
          className="shadow-sm w-24 mb-2 h-10 text-base bg-white text-main font-semibold -translate-y-1"
          onClick={() => {
            navigate("/home");
          }}
        >
          返回
        </Button>
        <Header message={true} />
        <div
          className="flex  mt-6 h-4/5 md:flex-col md:h-auto md:mb-12 md:items-center"
          style={{
            backgroundColor: "#FFFFFF",
            padding: "2.6vh 2.2vw",
            borderRadius: "12px",
            boxShadow: "6px 6px 12px #DEDEDE",
            border: "1px solid  #DEDEDE",
          }}
        >
          <ContentLeft
            setPageData={setPageData}
            setRenderData={setRenderData}
            choose={choose}
            setChoose={setChoose}
          />
          {dialog.open ? <Dialog toUserId={toUserId} /> : null}
          <ContentRight
            renderData={renderData}
            setRenderData={setRenderData}
            setToUserId={setToUserId}
            pageData={pageData}
            setPageData={setPageData}
            choose={choose}
            user={user}
            dispatchDialogInfo={dispatchDialogInfo}
          />
        </div>
      </div>
    </>
  );
}
