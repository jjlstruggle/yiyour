import React, { Dispatch, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Avatar, UploadProps } from "antd";
import { Button, Divider, message, Upload } from "antd";
import useLazy from "@/hooks/useLazy";
import img1 from "../../../assets/temp/shell.jpg";
import { getTaskInfo } from "@/api/task";

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
          <div className="bg-main w-3 h-6 mr-2"></div>
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
          <div className="bg-main w-3 h-6 mr-2"></div>
          已经提交的作品数量
        </div>
        <Divider />
        <p className="text-xl">{detailInfo.taskWorksNumber}件</p>
      </div>
    );
  };
  const Oups: React.FC = () => {
    return (
      <div style={{ width: "100vw", padding: "2vh 6vw" }}>
        <div className="text-xl font-bold flex items-center ">
          <div className="bg-main w-3 h-6 mr-2"></div>
          我要提交作品
        </div>
        <Divider />
        <div className="flex">
          <Upload {...props}>
            <Button className="bg-slate-300" icon={<UploadOutlined />}>
              点击上传作品
            </Button>
          </Upload>
          <Button className="bg-main ml-10 text-xs text-zinc-50">
            确认提交
          </Button>
        </div>
      </div>
    );
  };
  const Process: React.FC = () => {
    return (
      <div style={{ width: "100vw", padding: "2vh 6vw" }}>
        <div className="text-xl font-bold flex items-center ">
          <div className="bg-main w-3 h-6 mr-2"></div>
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
        <div className="flex w-full h-full box-border justify-between mb-20">
          <div className="w-60 h-80 " style={{ backgroundColor: "#FFFFFF" }}>
            <img className="w-60 h-40 " src={img1} />
            <div className="w-60 h-40 flex flex-col justify-around ">
              <div className="font-bold text-base">收一份情书模板</div>
              <div className="text-xs text-gray-400">2022/5/12 12:00截止 </div>
              <div className="text-xs text-gray-400">文本/文案</div>
              <div className="text-main text-base">悬赏： 20元</div>
            </div>
          </div>
          <div className="w-60 h-80 " style={{ backgroundColor: "#FFFFFF" }}>
            <img className="w-60 h-40 " src={img1} />
            <div className="w-60 h-40 flex flex-col justify-around ">
              <div className="font-bold text-base">收一份情书模板</div>
              <div className="text-xs text-gray-400">2022/5/12 12:00截止 </div>
              <div className="text-xs text-gray-400">文本/文案</div>
              <div className="text-main text-base">悬赏： 20元</div>
            </div>
          </div>
          <div className="w-60 h-80 " style={{ backgroundColor: "#FFFFFF" }}>
            <img className="w-60 h-40 " src={img1} />
            <div className="w-60 h-40 flex flex-col justify-around ">
              <div className="font-bold text-base">收一份情书模板</div>
              <div className="text-xs text-gray-400">2022/5/12 12:00截止 </div>
              <div className="text-xs text-gray-400">文本/文案</div>
              <div className="text-main text-base">悬赏： 20元</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col ">
      <div
        style={{ width: "100vw" }}
        className="flex justify-between  box-border my-14"
      >
        <div className=" relative w-1/2">
          <div className="absolute text-xl -top-8 left-1/4  flex">
            /任务集市/{detailInfo.type}
          </div>
          <img
            src={detailInfo.taskPicture}
            style={{
              borderRadius: "0 30% 30% 0 / 0  50%  50%  0",
              background: "#3333",
              width: "47vw",
              height: "490px",
            }}
          ></img>
        </div>
        <div className="flex flex-col ml-20 justify-around w-1/2 ">
          <div className="text-3xl font-bold">{detailInfo.taskName}</div>
          <div className="flex items-center">
            <Avatar size={48} src={detailInfo.publisherAvatar} />{" "}
            <div className="text-2xl ml-5">{detailInfo.publisherName} </div>
          </div>
          <div className="text-2xl font-bold">￥ {detailInfo.taskPrice}元</div>
          <div className="text-2xl">截止日期：{detailInfo.taskDeadline}</div>
          <Button className="w-52 h-10 bg-main text-amber-50 font-semibold">
            我要提交
          </Button>
          <Button className="w-52 h-10 bg-yellow-500 font-semibold">
            添加收藏
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
