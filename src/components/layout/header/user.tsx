import { Modal } from "antd";
import useLazy from "@/hooks/useLazy";
import { useContext, useState, Dispatch, SetStateAction } from "react";
import UserContext from "@/context/user";
import userImg from "@/assets/image/user.avif";

const Login = useLazy(import("./login"));

export default function User() {
  const [visible, setVisble] = useState(false);
  const { user } = useContext(UserContext);
  const { hasLogin, userInfo } = user;

  return (
    <div
      className="flex items-center cursor-pointer mr-8"
      onClick={() => {
        if (!hasLogin) {
          setVisble(true);
        }
      }}
    >
      <img
        className="w-7 h-7 rounded-full mr-3"
        // @ts-ignore
        src={hasLogin ? userInfo.img : userImg}
      />
      <div className=" text-white flex items-center">
        {hasLogin ? "" : "未登录"}
      </div>
      <Modal
        keyboard={false}
        maskClosable={false}
        visible={visible}
        footer={null}
        closable={false}
        bodyStyle={{
          padding: 0,
        }}
      >
        <Login setVisble={setVisble} />
      </Modal>
    </div>
  );
}
