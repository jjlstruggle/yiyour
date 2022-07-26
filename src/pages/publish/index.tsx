/**
 * 发布页
 */
import { DownOutlined } from "@ant-design/icons";
import Select from "@/components/publish/select";
import GoodUpload from "@/components/publish/upload";
import { Input, TimePicker, DatePicker, InputNumber } from "antd";
import { Dayjs } from "dayjs";
import { useState } from "react";
import Text from "@/components/publish/text";

export default function Publish() {
  const [name, setName] = useState("");
  const [value, setValue] = useState<Dayjs | null>(null);
  const onChange = (type: "time" | "date" | "month" | "year") => {
    return (time: any) => {
      switch (type) {
        case "time":
          return;
        case "date":
          return;
        case "month":
          return;
        case "year":
          return;
      }
    };
  };

  return (
    <div className="bg-slate-50">
      <div className="w-4/5 shadow-xl mx-auto pt-4 px-6 text-2xl font-bold mt-8 mb-10 pb-6 bg-white">
        <div className="flex items-center mb-6">
          <div className="bg-main w-3 h-7 mr-2"></div>
          <div className="mr-16">您选择发布一个</div>
          <Select item={["任务", "作品"]} />
        </div>
        <div className="flex items-center">
          <div className="bg-main w-3 h-7 mr-2"></div>
          <div className="mr-16">您需要哪类作品</div>
          <Select item={["文本文案", "图片", "音频"]} />
        </div>
      </div>
      <div className="w-4/5 shadow-xl mx-auto pt-4 px-6 text-2xl font-bold mt-8 mb-10 pb-6 bg-white">
        <div className="flex items-center mb-12 ">
          <div className="bg-main w-3 h-7 mr-2"></div>
          <div className="mr-16">请填写任务标题</div>
          <Input
            style={{ width: 300 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入作品名称"
          />
        </div>
        <div className="mb-12">
          <div className="flex">
            <div className="bg-main w-3 h-7 mr-2"></div>
            <div className="mr-16">请上传封面作品</div>
          </div>
          <div>
            <GoodUpload />
          </div>
        </div>
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-main w-3 h-7 mr-2"></div>
            <div className="mr-16">
              请选择任务截止时间
              <span className="font-normal text-sm">
                （截止后请在72小时内确定获奖作品，超时将由后台随机评定）
              </span>
            </div>
          </div>
          <div className="flex mb-4">
            <TimePicker
              format="HH:mm"
              // @ts-ignore
              value={value}
              onChange={onChange("time")}
              className="mr-6"
            />

            <DatePicker
              mode="date"
              format="DD"
              suffixIcon={<DownOutlined />}
              className="mr-6"
              onChange={onChange("date")}
            />
            <DatePicker
              format="MM"
              className="mr-6"
              onChange={onChange("month")}
              picker="month"
              suffixIcon={<DownOutlined />}
            />
            <DatePicker
              format="YYYY"
              className="mr-6"
              onChange={onChange("year")}
              picker="year"
              suffixIcon={<DownOutlined />}
            />
          </div>
        </div>
        <div className="flex items-center mb-12">
          <div className="bg-main w-3 h-7 mr-2"></div>
          <div className="mr-16">您需要哪类作品</div>
          <Select item={["文本文案", "图片", "音频"]} />
        </div>
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-main w-3 h-7 mr-2"></div>
            <div className="mr-16">请尽可能详细的描述您的需求</div>
          </div>
          <Text />
        </div>
      </div>
      <div className="w-4/5 shadow-xl mx-auto pt-4 px-6 text-2xl font-bold mt-8 mb-10 pb-6 bg-white">
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-main w-3 h-7 mr-2"></div>
            <div className="mr-16">请输入悬赏金额</div>
            <InputNumber addonBefore="￥" />
          </div>
          <div className="text-gray-400 font-normal text-base ml-4 mb-12">
            <div>金额1--499，奖项限定1，最小参与数2，奖金比例100%</div>
            <div>金额500--1499，奖项限定2，最小参与数4，奖金比例6:4</div>
            <div>金额1500--2999，奖项限定3，最小参与数6，奖金比例5:3:2</div>
            <div>金额3000+，奖项限定4，最小参与数8，奖金比例4:3:2:1</div>
          </div>
          <div className="ml-4 flex justify-between items-center text-xl font-normal mb-12">
            <div>首页广告位展示（15天）</div>
            <div>￥ 1000</div>
          </div>
          <div className="ml-4 flex justify-between items-center text-xl font-normal mb-12">
            <div>底部广告位展示（15天）</div>
            <div>￥ 800</div>
          </div>
          <div className="text-lg text-gray-400 font-normal">
            （提示：广告内容如需更换，请联系我们）
          </div>
        </div>
      </div>
    </div>
  );
}
