import deposit from "@/assets/userIconTemp/deposit.png";
import { Divider } from "antd";
export default function Deposit() {
  return (
    <div className="flex flex-1 ml-10 relative">
      <img
        className="absolute"
        style={{ width: "16vw", top: "0" }}
        src={deposit}
      />
      <div
        className="absolute text-3xl"
        style={{
          top: "0",
          width: "16vw",
          height: `${(16 * 106.39) / 151.49}vw`,
        }}
      >
        <div className="text-2xl absolute" style={{ top: "30%", left: "22%" }}>
          押金：
        </div>
        <div
          className=" absolute text-3xl"
          style={{ top: "64%", left: "30%", color: "#F6B66E" }}
        >
          500.00
          <span
            className=" text-base"
            style={{ marginLeft: "20%", color: "#000000" }}
          >
            (元)
          </span>
        </div>
      </div>
      <div className="flex absolute" style={{ top: "40%" }}>
        <div>支付宝支付</div>
        <div>微信支付</div>
      </div>
      <Divider />
      <div className="flex flex-col absolute" style={{ top: "54%" }}>
        <p className="text-xl"> 押金会员权益:</p>
        <p className="text-base"> 发布任务:</p>
        <p className="text-base">
          {" "}
          （1）3小时内可免费撤销(普通用户会扣除5%平台金)
        </p>
        <p className="text-base"> （2）任务结束后可与所有投稿者私信</p>
        <p className="text-base">
          {" "}
          （3）任务期间可补充编辑内容并拥有一次延长期限权限 购买报价:
        </p>
        <p className="text-base">
          （1）可看到已报价人数最高报价(说明未被接受)
          （2）可看到售卖者的一口成交价
        </p>
      </div>
    </div>
  );
}
