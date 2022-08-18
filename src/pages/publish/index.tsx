/**
 * 发布页
 */

import Select from "@/components/publish/select";
import GoodUpload from "@/components/publish/upload";
import { InputNumber, Checkbox, Button, InputRef } from "antd";
import { useRef, useState } from "react";
import Text from "@/components/publish/text";
import TimeSelect from "@/components/publish/timeSelect";
import NameInput from "@/components/publish/nameInput";
import AddNumber from "@/components/publish/addNumber";
import type { RcFile } from "antd/es/upload";
import { TextAreaRef } from "antd/lib/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { DDate } from "@/interface/type";
import { publish } from "@/api/task";
import { upload } from "@/api/oss";
const task = ["任务", "作品"];
const type = ["文本文案", "图片", "音频"];

type PublishStorage = null | {
  date: string;
  bottomAd: number;
  name: string;
  price: number;
  task: number;
  text: string;
  topAd: number;
  type: number;
};

function formate(date: Dayjs): { date: DDate } {
  return {
    date: {
      year: String(date.year()),
      month: String(date.month() + 1),
      date: String(date.date()),
      time: String(date.hour() + ":" + date.minute()),
    },
  };
}

export default function Publish() {
  let storage: PublishStorage = JSON.parse(
    localStorage.getItem("publishTemp")!
  );
  const shouldLoadFromStorage = storage === null ? false : true;

  let formateDate = shouldLoadFromStorage
    ? storage!.date
      ? formate(dayjs(storage!.date))
      : null
    : null;
  let formateName = shouldLoadFromStorage
    ? storage?.name
      ? storage.name
      : ""
    : "";
  let formateTask = shouldLoadFromStorage
    ? storage?.task
      ? storage.task
      : null
    : null;
  let formateType = shouldLoadFromStorage
    ? storage?.type
      ? storage.type
      : null
    : null;
  let formateText = shouldLoadFromStorage
    ? storage?.text
      ? storage.text
      : ""
    : "";
  let formatPrice = shouldLoadFromStorage
    ? storage?.price
      ? storage.price
      : 0
    : 0;
  let formatTopAd = shouldLoadFromStorage
    ? storage?.topAd
      ? storage.topAd
      : 0
    : 0;
  let formatBottomAd = shouldLoadFromStorage
    ? storage?.bottomAd
      ? storage.bottomAd
      : 0
    : 0;

  const timeRef = useRef<{ date: DDate }>(null);
  const nameRef = useRef<InputRef>(null);
  const taskRef = useRef(formateTask);
  const typeRef = useRef(formateType);
  const textRef = useRef<TextAreaRef>(null);
  const [price, setPrice] = useState(formatPrice);
  const [topAd, setTopAd] = useState(formatTopAd);
  const [bottomAd, setBottomAd] = useState(formatBottomAd);
  const [file, setFile] = useState<RcFile[]>([]);

  let allPrice = 1000 * topAd + 800 * bottomAd + price;

  const handleSave = () => {
    let date = timeRef.current?.date;
    localStorage.setItem(
      "publishTemp",
      JSON.stringify({
        task: taskRef.current,
        type: typeRef.current,
        name: nameRef.current!.input!.value,
        date:
          date?.year + "-" + date?.month + "-" + date?.date + " " + date?.time,
        text: textRef.current!.resizableTextArea!.props.value,
        topAd,
        bottomAd,
        price,
      })
    );
  };

  const handleSubmit = async () => {
    let date = timeRef.current?.date;
    const res = await upload(file[0]);
    console.log(res);

    if (taskRef.current == 0) {
      /* const res = await publish({
        bottomAds: bottomAd,
        taskName: nameRef.current!.input!.value,
        type: type[typeRef.current!],
        frontPageAds: topAd,
        taskDeadline:
          date?.year + "-" + date?.month + "-" + date?.date + "-" + date?.time,
        taskPrice: price,
        taskDemands: textRef.current!.resizableTextArea!.props
          .value as unknown as string,
      }); */
    }
  };

  return (
    <div className="bg-slate-50">
      <div className="w-4/5 shadow-xl mx-auto pt-4 px-6 text-2xl font-bold mt-8 mb-10 pb-6 bg-white">
        <div className="flex items-center mb-6">
          <div className="bg-ger w-3 h-7 mr-2"></div>
          <div className="mr-16">您选择发布一个</div>
          <Select item={task} ref={taskRef} />
        </div>
        <div className="flex items-center">
          <div className="bg-ger w-3 h-7 mr-2"></div>
          <div className="mr-16">您需要哪类作品</div>
          <Select item={type} ref={typeRef} />
        </div>
      </div>
      <div className="w-4/5 shadow-xl mx-auto pt-4 px-6 text-2xl font-bold mt-8 mb-10 pb-6 bg-white">
        <NameInput ref={nameRef} initalName={formateName!} />
        <div className="mb-12">
          <div className="flex mb-6">
            <div className="bg-ger w-3 h-7 mr-2"></div>
            <div className="mr-16">请上传封面作品</div>
          </div>
          <div>
            <GoodUpload fileList={file} setFileList={setFile} />
          </div>
        </div>
        <TimeSelect ref={timeRef} initalDate={formateDate!} />
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-ger w-3 h-7 mr-2"></div>
            <div className="mr-16">请尽可能详细的描述您的需求</div>
          </div>
          <Text ref={textRef} initalText={formateText} />
        </div>
      </div>
      <div className="w-4/5 shadow-xl mx-auto pt-4 px-6 text-2xl font-bold mt-8 mb-10 pb-6 bg-white">
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-ger w-3 h-7 mr-2"></div>
            <div className="mr-16">请输入悬赏金额</div>
            <InputNumber
              min={0}
              addonBefore="￥"
              value={price}
              onChange={(e) => {
                if (!isNaN(e)) setPrice(e);
              }}
            />
          </div>
          <div className="text-gray-400 font-normal text-base ml-4 mb-12">
            <div>金额1--499，奖项限定1，最小参与数2，奖金比例100%</div>
            <div>金额500--1499，奖项限定2，最小参与数4，奖金比例6:4</div>
            <div>金额1500--2999，奖项限定3，最小参与数6，奖金比例5:3:2</div>
            <div>金额3000+，奖项限定4，最小参与数8，奖金比例4:3:2:1</div>
          </div>
          <div className="ml-4 flex justify-between items-center text-xl font-normal mb-12">
            <div>首页广告位展示（15天）</div>
            <div className="flex items-center">
              <div>￥ 1000</div>
              <AddNumber ad={topAd} change={setTopAd} />
            </div>
          </div>
          <div className="ml-4 flex justify-between items-center text-xl font-normal mb-12">
            <div>底部广告位展示（15天）</div>
            <div className="flex items-center">
              <div>￥ 800</div>
              <AddNumber ad={bottomAd} change={setBottomAd} />
            </div>
          </div>
          <div className="text-lg text-gray-400 font-normal">
            （提示：广告内容如需更换，请联系我们）
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Checkbox>
              <div className="flex items-center">
                <div className="text-gray-400 text-base font-normal">
                  我已同意
                </div>
                <div className="text-lg font-normal text-black">
                  《用户协议》
                </div>
              </div>
            </Checkbox>
          </div>
          <div className="flex items-center">
            <div className="text-base font-normal">合计</div>
            <div className="text-3xl text-yel mr-5">￥{allPrice}.00</div>
            <Button type="primary" className="bg-yel font-bold">
              结算
            </Button>
          </div>
        </div>
      </div>
      <div className="w-4/5 shadow-xl mx-auto pt-4 px-6 text-2xl font-bold mt-8 mb-10 pb-6 bg-white">
        <div className="flex items-center mb-6">
          <div className="bg-ger w-3 h-7 mr-2"></div>
          <div className="mr-16">发布流程</div>
        </div>
        <div className="ml-5 font-normal text-lg mb-2">发布任务：</div>
        <div className="ml-5 font-normal text-lg">
          填写任务信息→设定悬赏金额（平台扣除5%）→发布→挑选作品→公布选中作品
        </div>
      </div>
      <div className="flex items-center justify-around mb-12 w-80 mx-auto">
        <Button type="primary" className="bg-ger" onClick={handleSave}>
          保存
        </Button>
        <Button type="primary" className="bg-ger" onClick={handleSubmit}>
          发布
        </Button>
      </div>
    </div>
  );
}
