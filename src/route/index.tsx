import useLazy from "@/hooks/useLazy";
import { Routes, Route, Navigate } from "react-router-dom";
const Publish = useLazy(import("../pages/publish"));
const User = useLazy(import("../pages/user"));
const Home = useLazy(import("../pages/home"));
const About = useLazy(import("../pages/about"));
const Detail = useLazy(import("../pages/home/detail/detail"))
const Person=useLazy(import("../pages/user/person/index"))
export default function Router() {
  return (
    <Routes>
      <Route path="publish/*" element={<Publish />} />
      <Route path="user/" element={<User />} />
       <Route path="user/person" element={< Person/>} />
      <Route path="home" element={<Home />} />
      <Route path="home/detail" element={<Detail />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  );
}
