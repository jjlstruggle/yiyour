import useLazy from "@/hooks/useLazy";
import { Routes, Route, Navigate } from "react-router-dom";
const Publish = useLazy(import("../pages/publish"));
const User = useLazy(import("../pages/user"));
const Index = useLazy(import("../pages/index"));
const About = useLazy(import("../pages/about"));
export default function Router() {
  return (
    <Routes>
      <Route path="publish/*" element={<Publish />} />
      <Route path="user/*" element={<User />} />
      <Route path="index/*" element={<Index />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<Navigate to="index" />} />
    </Routes>
  );
}
