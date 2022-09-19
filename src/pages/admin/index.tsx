import useLazy from "../../hooks/useLazy";
import { Routes, Route, Navigate } from "react-router-dom";
const Frame = useLazy(import("../../components/frame/index"));
const OrderAdmin = useLazy(import("./order/order"));
const UserAdmin = useLazy(import("./user/user"));
const Statics = useLazy(import("./user/user"));
const Operator = useLazy(import("./user/user"));
const OrgAdmin = useLazy(import("./user/user"));
const WorksAdmin = useLazy(import("./works/works"));
// const ConsoleLogin = useLazy(import("./login/login"));
export default function Admin() {
  return (
    <Frame>
      <Routes>
        <Route path={"order"} element={<OrderAdmin />} />
        <Route path={"user"} element={<UserAdmin />} />
        <Route path={"statics"} element={<Statics />} />
        <Route path={"operator"} element={<Operator />} />
        <Route path={"organize"} element={<OrgAdmin />} />
        <Route path={"works"} element={<WorksAdmin />} />
      </Routes>
    </Frame>
  );
}
