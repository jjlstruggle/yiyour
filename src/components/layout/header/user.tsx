import { useContext} from "react";
import UserContext from "@/context/user";
import userImg from "@/assets/image/user.avif";
import { useNavigate } from "react-router-dom";

export default function User() {
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
      <div className="flex items-center mr-8">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            if (!hasLogin) {
              navigate("/account/login");
            } else {
              navigate("/user");
            }
          }}
        >
          <img
            className="w-7 h-7 rounded-full mr-3"
            src={
              // @ts-ignore
              hasLogin ? (userInfo.avatar ? userInfo.avatar : userImg) : userImg
            }
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
