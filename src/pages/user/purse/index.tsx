import useLazy from "@/hooks/useLazy";
const Header = useLazy(import("../../../components/user/header"));
const HeaderBack = useLazy(import("@/components/user/headerback"));
import { useState, useContext, useEffect } from "react";
import { Button, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import UserContext from "@/context/user";
const Balance = useLazy(import("./balance/index"));
const Deposit = useLazy(import("./deposit/index"));
const ContentLeft = ({ choose, setChoose }: any) => {
  return (
    <div
      className="flex flex-col w-32   h-full md:flex md:flex-row  md:border-b-2  md:px-8  md:w-full md:h-20 md:justify-between md:items-center   md:border-gray-300"
      style={{ borderRight: "2px solid #E2E2E2" }}
    >
      <Button
        style={
          choose
            ? { backgroundColor: "#F6B76C" }
            : { backgroundColor: "#895DC3" }
        }
        className="shadow-xl  w-24 h-10  mt-6 text-white text-base font-semibold md:mt-0"
        onClick={() => {
          if (!choose) setChoose(true);
        }}
      >
        我的余额
      </Button>
      <Button
        onClick={() => {
          if (choose) setChoose(false);
        }}
        style={
          !choose
            ? { backgroundColor: "#F6B76C" }
            : { backgroundColor: "#895DC3" }
        }
        className="shadow-xl  w-24 h-10  mt-6 text-white text-base font-semibold md:mt-0"
      >
        押金会员
      </Button>
    </div>
  );
};
export default function Purse() {
  const navigate = useNavigate();
  const [choose, setChoose] = useState(true);
  const { user } = useContext(UserContext);
  return (
    <>
      <HeaderBack />
      <div
        style={{
          backgroundColor: "#F7F7F7",
          height: "100vh",
          padding: "4vh 5vw",
        }}
        className="md:mb-4 md:h-auto "
      >
        <Button
          className="shadow-sm w-24 mb-2 h-10 text-base bg-white text-main font-semibold -translate-y-1"
          onClick={() => {
            navigate("/home");
          }}
        >
          返回
        </Button>
        <Header purse={true} />
        <div
          className="flex  mt-6 h-4/5 md:flex-col md:h-auto md:mb-12"
          style={{
            backgroundColor: "#FFFFFF",
            padding: "2.6vh 2.2vw",
            borderRadius: "12px",
            boxShadow: "6px 6px 12px #DEDEDE",
            border: "1px solid  #DEDEDE",
          }}
        >
          <ContentLeft choose={choose} user={user} setChoose={setChoose} />
          {choose ? <Balance /> : <Deposit />}
        </div>
      </div>
    </>
  );
}
