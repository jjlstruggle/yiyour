import "./index.css";
import logo from "@/assets/image/login/logo.png";
import top from "@/assets/image/login/top.png";
import bottom from "@/assets/image/login/bottom.png";
import useLazy from "@/hooks/useLazy";
import { Navigate, Route, Routes } from "react-router-dom";
const Register = useLazy(import("./register"));
const Forget = useLazy(import("./forget"));
const Login = useLazy(import("./login"));

export default function Account() {
  return (
    <div className="loginPage w-full h-full relative">
      <div
        className="absolute"
        style={{
          width: "35.2vw",
          height: "12.6vh",
          left: "3.2vw",
          top: "20vh",
        }}
      >
        <div
          style={{
            fontFamily: "Microsoft YaHei",
            fontWeight: 700,
            fontSize: 75,
            color: "#E1D9EC",
          }}
        >
          欢迎来到
        </div>
      </div>
      <div
        className="absolute"
        style={{
          width: "21.4vw",
          height: "25.8vh",
          left: "10.8vw",
          top: "36.1vh",
        }}
      >
        <div className="friendText">我的伙伴</div>
      </div>
      <div
        className="absolute"
        style={{
          width: "22.6vw",
          height: "29vh",
          left: "24.1vw",
          top: "17.6vh",
        }}
      >
        <img src={logo} alt="" className="w-full h-full" />
      </div>
      <div
        className="absolute"
        style={{
          width: "8vw",
          height: "23.1vh",
          top: "14.5vh",
          left: "18.3vw",
        }}
      >
        <img src={top} alt="" className="w-full h-full" />
      </div>
      <div
        className="absolute"
        style={{
          width: "4vw",
          height: "10vh",
          top: "53.9vh",
          left: "28.7vw",
        }}
      >
        <img src={bottom} alt="" className="w-full h-full" />
      </div>
      <div
        className="bg-white absolute"
        style={{
          width: 480,
          right: "10vw",
          top: "24vh",
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="*" element={<Navigate to="/account/login" />} />
        </Routes>
      </div>
    </div>
  );
}
