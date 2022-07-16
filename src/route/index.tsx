import useLazy from "@/hooks/useLazy";
import { Routes, Route, Navigate } from "react-router-dom";
const Publish = useLazy(import("../pages/publish"));
const User = useLazy(import("../pages/user"));
const Home = useLazy(import("../pages/home"));
const About = useLazy(import("../pages/about"));
export default function Router() {
  return (
    <Routes>
      <Route path="publish/*" element={<Publish />} />
      <Route path="user/*" element={<User />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  );
}
