import React, {
  Dispatch,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useContext,
} from "react";
import Card from "@/common/card";
import useLazy from "@/hooks/useLazy";
import { useLocation } from "react-router-dom";
import {
  Button,
  Divider,
  message,
  Popconfirm,
  Avatar,
  UploadProps,
  Upload,
} from "antd";
import {
  getTaskInfo,
  getRecommend,
  postUserCollect,
  postUserCommit,
} from "@/api/task";
import { upload } from "@/api/oss";
import { TaskListInfo } from "@/interface/api";
const AddNumber = useLazy(import("@/components/detail/addNumber"));
const Back = useLazy(import("@/components/user/back"));
import { useNavigate } from "react-router-dom";
import { UploadIcon, LoveIcon } from "@/assets/svg/index";
import UserContext from "@/context/user";
const Task = ({ item }: { item: TaskListInfo }) => {
  const navigate = useNavigate();
  return (
    <div
      className="mb-5 relative mt-1 w-60 md:w-full"
      onClick={() => {
        navigate("/home/detail", { state: { cardId: item.id } });
      }}
    >
      <Card
        title={item.taskName}
        price={item.taskPrice}
        img={item.taskPicture}
        tag={item.type}
        linked={false}
        ddl={item.taskDeadline}
      />
    </div>
  );
};
function Detail() {
  const [detailInfo, setDetailInfo]: [any, Dispatch<any>] = useState({
    id: 29,
    publisherAvatar: null,
    publisherId: 1845,
    publisherName: "13476179629",
    taskDeadline: "2026-08-23 22:19:00",
    taskDemands: "无",
    taskName: "NANA也来一只qwq",
    taskPicture: "",
    taskPrice: 0,
    taskProcess: null,
    taskWorksNumber: 0,
    type: "",
  });
  const { user, dispatchUserInfo } = useContext(UserContext);
  const handleOk = () => {
    let fn = async () => {
      let res = await postUserCollect(detailInfo.id);
      if (res.code == "0") {
        message.success("收藏成功!");
      }
    };
    fn();
  };

  const replace = (str: string) => {
    return str.replace(/(\-)/g, "/").match(/\d*.\d*.\d*....../);
  };
  const location = useLocation();
  useEffect(() => {
    (async () => {
      const { cardId }: any = location.state;
      let res = await getTaskInfo(cardId);
      if (res.code == "0") {
        console.log(res.data);
        setDetailInfo(res.data);
      }
    })();
  }, []);
  // 上传
  const uploadProps: UploadProps = {
    maxCount: 1,
    action: "http://47.96.86.132:88/api-oss/",
    accept: "image/*",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(123);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} 上传成功`);
        console.log(info.file.response.data.realUrl);

        const handleClickCommit = (
          taskId: number,
          url: string,
          userId: number
        ) => {
          let fn = async () => {
            let res: any = await handleClickCommit(taskId, url, userId);
            if (res.code == 0) {
            }
          };
          fn();
        };
        handleClickCommit(
          detailInfo.id,
          info.file.response.data.realUrl,
          // @ts-ignore
          user.userInfo.id
        );
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} 上传失败.`);
      }
    },
  };
  const Demand: React.FC = () => {
    return (
      <div style={{ width: "100vw", padding: "2vh 6vw" }}>
        <div className="text-xl font-bold flex items-center ">
          <div className="bg-ger w-3 h-6 mr-2"></div>
          需求描述
        </div>
        <Divider />
        <div className="text-xl"> {detailInfo.taskDemands}</div>
      </div>
    );
  };
  const Have: React.FC = () => {
    return (
      <div style={{ width: "100vw", padding: "2vh 6vw" }}>
        <div className="text-xl font-bold flex items-center ">
          <div className="bg-ger w-3 h-6 mr-2"></div>
          出价人数
        </div>
        <Divider />
        <p className="text-xl">{detailInfo.taskWorksNumber}人</p>
      </div>
    );
  };
  const Oups: React.FC = () => {
    const [value, setValue] = useState(detailInfo.taskPrice);
    return (
      <div style={{ width: "100vw", padding: "2vh 6vw" }}>
        <div className="text-xl font-bold flex items-center ">
          <div className="bg-ger w-3 h-6 mr-2"></div>
          我要出价
        </div>
        <Divider />
        <div className="flex">
          <AddNumber
            ad={value}
            change={(e: any) => {
              setValue(e);
            }}
            defaultValue={detailInfo.taskPrice}
          />
        </div>
      </div>
    );
  };
  const Process: React.FC = () => {
    return (
      <div style={{ width: "100vw", padding: "2vh 6vw" }}>
        <div className="text-xl font-bold flex items-center ">
          <div className="bg-ger w-3 h-6 mr-2"></div>
          参与流程
        </div>
        <Divider />
        <p className="text-xl">参与任务：</p>
        <p className="text-xl">上传作品-发布者选择作品-收到结果</p>
        <p className="text-xl">购买作品：</p>
        <p className="text-xl">
          填写出价(大于等于发布者理想买价直接成交)-发布者接受或者拒绝出价-收到结果
        </p>
      </div>
    );
  };
  const Result: React.FC = () => {
    const [listData, setListData] = useState([]);
    useLayoutEffect(() => {
      let fn = async () => {
        let res = await getRecommend();
        if (res.code == "0") {
          setListData(res.data);
        }
      };
      fn();
    }, []);
    return (
      <div
        className=" w-full h-3/5"
        style={{ padding: "2vh 6vw", backgroundColor: "#F7F7F7" }}
      >
        <div className="text-xl font-bold flex items-center ">
          <div className="bg-main w-3 h-6 mr-2"></div>
          发布推荐
        </div>
        <Divider />
        <div className="flex w-full box-border justify-between mb-20 md:flex-col">
          {listData.map((item, index) => (
            <Task key={index} item={item} />
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col mb-10">
      <div className="mt-10 ml-10 md:mt-6 md:ml-5">
        <Back />
      </div>
      <div
        style={{ width: "100vw" }}
        className="flex justify-between  box-border my-14 md:flex-col"
      >
        <div className=" relative w-1/2 ">
          <div className="absolute text-xl -top-8 left-1/4  flex items-center   md:w-[100vw] ">
            <img
              className="w-8"
              src={require("../../../assets/house.png")}
              alt=""
            />
            /任务集市/
            {detailInfo.type}
          </div>
          <img
            alt=""
            className="md:w-[100vw] md:h-[360px]"
            src={detailInfo.taskPicture}
            style={{
              borderRadius: "0 30% 30% 0 / 0  50%  50%  0",
              background: "#3333",
              width: "47vw",
              height: "490px",
            }}
          ></img>
        </div>
        <div className="flex flex-col ml-20 justify-around w-1/2  md:flex-row md:flex-wrap md:ml-0 md:w-full md:mt-5 md:items-center ">
          <div className="text-3xl font-bold">{detailInfo.taskName}</div>
          <div className="flex items-center">
            <Avatar size={48} src={detailInfo.publisherAvatar} />{" "}
            <div className="text-2xl ml-5">{detailInfo.publisherName} </div>
          </div>
          <div className="text-2xl font-bold ">￥ {detailInfo.taskPrice}元</div>
          <div className="text-2xl md:mt-2 flex items-center">
            <img
              alt=""
              src={require("@/assets/calendar.png")}
              className="w-6 mr-3"
            />{" "}
            截止日期：
            {replace(detailInfo.taskDeadline)}
          </div>
          <Upload className=" min-w-[50px]" {...uploadProps}>
            <Button className="flex items-center justify-center w-52 h-10 bg-ger text-amber-50 font-semibold md:mt-2">
              我要提交
            </Button>
          </Upload>
          <Popconfirm
            placement="top"
            title="是否确认收藏?"
            onConfirm={handleOk}
            okText="确定"
            cancelText="取消"
          >
            <Button
              onClick={() => {
                console.log(123);
              }}
              className="flex items-center justify-center  w-52 h-10 bg-yel font-semibold md:mt-2"
            >
              添加收藏
              <LoveIcon className={`text-white`} />
            </Button>
          </Popconfirm>
        </div>
      </div>
      <Demand />
      <Have />
      <Oups />
      <Process />
      <Result />
    </div>
  );
}

export default Detail;
