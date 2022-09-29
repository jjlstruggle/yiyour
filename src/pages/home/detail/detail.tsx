import React, {
  Dispatch,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Avatar, UploadProps } from "antd";
import { Button, Divider, message, Upload } from "antd";
import useLazy from "@/hooks/useLazy";
import img1 from "../../../assets/temp/shell.jpg";
import { getTaskInfo, getRecommend } from "@/api/task";
import { TaskListInfo } from "@/interface/api";
import Card from "@/common/card";
const AddNumber = useLazy(import("@/components/detail/addNumber"));
import { useNavigate } from "react-router-dom";
import { UploadIcon, LoveIcon } from "@/assets/svg/index";
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
  const replace = (str: string) => {
    console.log(str);

    str.replace(/(\-)/gi, "/");
    let res = str.slice(0, str.length - 3);
    return res;
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
  const props: UploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  // 上传
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
    return (
      <div style={{ width: "100vw", padding: "2vh 6vw" }}>
        <div className="text-xl font-bold flex items-center ">
          <div className="bg-ger w-3 h-6 mr-2"></div>
          我要出价
        </div>
        <Divider />
        <div className="flex">
          <AddNumber />
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
      <div
        style={{ width: "100vw" }}
        className="flex justify-between  box-border my-14 md:flex-col"
      >
        <div className=" relative w-1/2 ">
          <div className="absolute text-xl -top-8 left-1/4  flex items-center   md:w-full ">
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
          <Button className="flex items-center justify-center w-52 h-10 bg-ger text-amber-50 font-semibold md:mt-2">
            我要提交
            <UploadIcon />
          </Button>
          <Button className="flex items-center justify-center  w-52 h-10 bg-yel font-semibold md:mt-2">
            添加收藏
            <LoveIcon className={`text-white`} />
          </Button>
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
