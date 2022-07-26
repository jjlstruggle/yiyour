import { NavLink } from "react-router-dom";

export default function Navigate() {
  return (
    <div className="flex flex-col">
      <NavLink to="home">首页</NavLink>
      <NavLink to="publish">发布</NavLink>
      <NavLink to="about">关于</NavLink>
      <NavLink to="home/detail">详情</NavLink>
      <NavLink to="user">用户</NavLink>
    </div>
  );
}
