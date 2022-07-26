/**
 * 发布页
 */
import { DownOutlined } from "@ant-design/icons";
import { TimePicker, DatePicker } from "antd";
import { useRef, useImperativeHandle, forwardRef, ForwardedRef } from "react";
import format from "@/util/format";

function TimeSelect(props: { $date: ForwardedRef<any> }) {
  const date = useRef({});
  const onChange = (type: "time" | "date" | "month" | "year") => {
    return (time: any) => {
      switch (type) {
        case "time":
          date.current[type] =
            format(time.hour()) + ":" + format(time.minute());
          return;
        case "date":
          date.current[type] = format(time.$D);
          return;
        case "month":
          date.current[type] = format(time.$M + 1);
          return;
        case "year":
          date.current[type] = time.$y;
          return;
      }
    };
  };
  useImperativeHandle(props.$date, () => ({
    date: date.current,
  }));

  return (
    <div className="mb-12">
      <div className="flex items-center mb-4">
        <div className="bg-ger w-3 h-7 mr-2"></div>
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
  );
}

export default forwardRef((props, ref) => (
  <TimeSelect {...props} $date={ref} />
));
