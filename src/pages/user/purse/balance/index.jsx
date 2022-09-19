import purse from "@/assets/userIconTemp/purse.png";
import { Button } from "antd";
import React, { useRef, useEffect, useState } from "react";
export default function Balance() {
  const [imgHeight, setImgHeight] = useState();
  const imgs = useRef(null);
  useEffect(() => {
    console.log(imgs.current);
    setImgHeight(imgs.current.height);
  }, []);
  return (
    <div className="w-full relative">
      <img
        ref={imgs}
        src={purse}
        className=" absolute left-1/3 top-1/3 -translate-x-1/3 -translate-y-1/3"
        style={{
          width: "40vw",
        }}
      />
      <div
        style={{
          height: `${(40 * 260.46) / 380.8}vw`,
          width: "40vw",
          zIndex: "500",
        }}
        className="absolute left-1/3 top-1/3 -translate-x-1/3 -translate-y-1/3"
      >
        <div className=" absolute text-3xl" style={{ top: "40%", left: "30%" }}>
          当前余额：
        </div>
        <div
          className=" absolute text-3xl"
          style={{ top: "70%", left: "30%", color: "#F6B66E" }}
        >
          99.00
          <span
            className=" text-base"
            style={{ marginLeft: "20%", color: "#000000" }}
          >
            (元)
          </span>
        </div>
      </div>
      <Button
        className="absolute bottom-3 left-1/2 text-lg"
        style={{
          backgroundColor: "#F6B66E",
          color: "#FFFFFF",
          width: "96px",
          height: "38px",
          borderRadius: "10px",
        }}
      >
        提现
      </Button>
    </div>
  );
}
