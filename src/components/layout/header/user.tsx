import { Modal } from "antd";
import useLazy from "@/hooks/useLazy";
import { useContext, useState } from "react";
import UserContext from "@/context/user";
import userImg from "@/assets/image/user.avif";
import { useNavigate } from "react-router-dom";
const Login = useLazy(import("./login"));

export default function User() {
  const [visible, setVisble] = useState(false);
  const { user, dispatchUserInfo } = useContext(UserContext);
  const { hasLogin, userInfo } = user;
  const navigate = useNavigate();

  const handleLogout = () => {
    if (hasLogin) {
      localStorage.clear();
      dispatchUserInfo({
        hasLogin: false,
        userInfo: {},
      });
    }
  };
  return (
    <>
      <Modal
        keyboard={false}
        maskClosable={false}
        visible={visible}
        footer={null}
        closable={false}
        bodyStyle={{
          padding: 0,
        }}
        destroyOnClose
      >
        <Login setVisble={setVisble} />
      </Modal>
      <div className="flex items-center mr-8">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            if (!hasLogin) {
              setVisble(true);
            } else {
              navigate("/user");
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
        </div>
        <div onClick={handleLogout}>{hasLogin ? "退出" : ""}</div>
      </div>
    </>
  );
}
