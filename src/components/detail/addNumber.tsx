import React, {
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Input, Button, message } from "antd";
import { type } from "os";

export default function AddNumber({
  ad,
  change,
  defaultValue,
}: {
  ad: number;
  change: Dispatch<SetStateAction<number>>;
  defaultValue: number;
}) {
  return (
    <div className="flex w-80 justify-between">
      <Button className="flex items-center justify-between  bg-[#E2E2E2] w-40 h-11">
        <div className="flex items-center text-xl">
          {" "}
          ￥
          <Input
            bordered={false}
            className="w-5/6 bg-[#E2E2E2]"
            value={ad}
            defaultValue={defaultValue}
            onChange={(e) => {
              if (!isNaN(e.target.value as unknown as number))
                change(Number(e.target.value));
            }}
          />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div
            onClick={() => {
              if (typeof ad == "number") {
                console.log(123);

                change(ad + 1);
              }
            }}
            className="w-0 h-0 border-transparent border-b-gray-700 border-8 border-solid"
          ></div>
          <div
            onClick={() => {
              if (ad == 0) {
                message.error("不能再减了");
                return;
              }
              if (ad) {
                change(ad - 1);
              }
            }}
            className="w-0 h-0 border-transparent border-t-gray-700 border-8 border-solid"
          ></div>
        </div>
      </Button>
      <Button className="bg-yel h-11 text-white text-base ">确认出价</Button>
    </div>
  );
}
