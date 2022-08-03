import useLazy from "../../hooks/useLazy";
import { Routes, Route, Navigate } from "react-router-dom";
const Frame = useLazy(import("../../components/frame/index"));
const Test = useLazy(import("./test/index"));
export default function Admin() {
  return (
    <Frame>
      {/* <Test /> */}
      <Routes>
        <Route path="123" element={<Test />} />
      </Routes>
    </Frame>
  );
}
