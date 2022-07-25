/**
 * 发布页
 */
import { DownOutlined } from "@ant-design/icons";
import Select from "@/components/publish/select";
import GoodUpload from "@/components/publish/upload";
import { Input, TimePicker, DatePicker, Space } from "antd";
import { Dayjs } from "dayjs";
import { useState } from "react";

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
      <div className="w-4/5 shadow-lg mx-auto pt-4 px-6 text-2xl font-bold mt-8 mb-10 pb-6">
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
      <div className="w-4/5 shadow-lg mx-auto pt-4 px-6 text-2xl font-bold mt-8 mb-10 pb-6">
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
        <div>
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
              suffixIcon={<DownOutlined />}
              className="mr-6"
              onChange={onChange("date")}
            />
            <DatePicker
              className="mr-6"
              onChange={onChange("month")}
              picker="month"
              suffixIcon={<DownOutlined />}
            />
            <DatePicker
              className="mr-6"
              onChange={onChange("year")}
              picker="year"
              suffixIcon={<DownOutlined />}
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-main w-3 h-7 mr-2"></div>
          <div className="mr-16">您需要哪类作品</div>
          <Select item={["文本文案", "图片", "音频"]} />
        </div>
      </div>
    </div>
  );
}
