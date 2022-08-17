/**
 * 发布页
 */

import Select from "@/components/publish/select";
import GoodUpload from "@/components/publish/upload";
import { InputNumber, Checkbox, Button, Input } from "antd";
import { useRef, useState } from "react";
import Text from "@/components/publish/text";
import TimeSelect from "@/components/publish/timeSelect";
import NameInput from "@/components/publish/nameInput";
import AddNumber from "@/components/publish/addNumber";
import type { UploadFile } from "antd/es/upload/interface";

const task = ["任务", "作品"];
const type = ["文本文案", "图片", "音频"];

export default function Publish() {
  const timeRef = useRef(null);
  const nameRef = useRef(null);
  const taskRef = useRef(null);
  const typeRef = useRef(null);
  const textRef = useRef(null);
  const [price, setPrice] = useState(0);
  const [topAd, setTopAd] = useState(0);
  const [bottomAd, setBottomAd] = useState(0);
  const [file, setFile] = useState<UploadFile[]>([]);

  let allPrice = 1000 * topAd + 800 * bottomAd + price;

  const handleSubmit = () => {
    console.log(taskRef.current);
    console.log(typeRef.current);
    console.log(nameRef.current);
    console.log(file);
    console.log(timeRef.current);
    console.log(textRef.current);
    console.log(allPrice);
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
        <NameInput ref={nameRef} />
        <div className="mb-12">
          <div className="flex">
            <div className="bg-ger w-3 h-7 mr-2"></div>
            <div className="mr-16">请上传封面作品</div>
          </div>
          <div>
            <GoodUpload fileList={file} setFileList={setFile} />
          </div>
        </div>
        <TimeSelect ref={timeRef} />
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-ger w-3 h-7 mr-2"></div>
            <div className="mr-16">请尽可能详细的描述您的需求</div>
          </div>
          <Text ref={textRef} />
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
        <Button type="primary" className="bg-ger" onClick={() => {}}>
          保存
        </Button>
        <Button type="primary" className="bg-ger" onClick={handleSubmit}>
          发布
        </Button>
      </div>
    </div>
  );
}
