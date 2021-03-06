import useLazy from "@/hooks/useLazy";
import { Routes, Route, Navigate } from "react-router-dom";
const Publish = useLazy(import("../pages/publish"));
const Home = useLazy(import("../pages/home"));
const About = useLazy(import("../pages/about"));
const Detail = useLazy(import("../pages/home/detail/detail"));
const Person = useLazy(import("../pages/user/person/index"));
const Collect = useLazy(import("../pages/user/collect/index"));
const Userpublish = useLazy(import("../pages/user/publish/index"));
const Join = useLazy(import("../pages/user/join/index"));
const Message = useLazy(import("../pages/user/message/index"));
const Navigater = useLazy(import("../pages/navigate"));

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigater />} />
      <Route path="publish/*" element={<Publish />} />
      <Route path="user/" element={<Person />} />
      <Route path="user/person" element={<Person />} />
      <Route path="user/collect" element={<Collect />} />
      <Route path="user/publish" element={<Userpublish />} />
      <Route path="user/message" element={<Message />} />
      <Route path="user/join" element={<Join />} />
      <Route path="home" element={<Home />} />
      <Route path="home/detail" element={<Detail />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
