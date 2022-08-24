import useLazy from "../../hooks/useLazy";
import { Routes, Route, Navigate } from "react-router-dom";
const Frame = useLazy(import("../../components/frame/index"));
const OrderAdmin = useLazy(import("./order/order"));
const UserAdmin = useLazy(import("./user/user"));
// const ConsoleLogin = useLazy(import("./login/login"));
export default function Admin() {
  return (
    <Frame>
      <Routes>
        <Route path={"order"} element={<OrderAdmin />} />
        <Route path={"user"} element={<UserAdmin />} />
        {/* <Route path={"/console/order"} element={<OrderAdmin />} /> */}
      </Routes>
    </Frame>
  );
}
