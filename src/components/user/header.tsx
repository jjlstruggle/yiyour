import React from "react";
import { Image } from "antd";

import { useNavigate } from "react-router-dom";

function UserHeader(props: any) {
  const navigate = useNavigate();
  const data = [
    {
      icon: props.camera ? "camera1" : "camera2",
      content: "我的发布",
      key: "/user/publish",
    },
    {
      icon: props.web ? "web1" : "web2",
      content: "我参与的",
      key: "/user/join",
    },
    {
      icon: props.love ? "love1" : "love2",
      content: "我的收藏",
      key: "/user/collect",
    },
    {
      icon: props.message ? "message1" : "message2",
      content: "我的消息",
      key: "/user/message",
    },
    {
      icon: props.star ? "star1" : "star2",
      content: "个人信息",
      key: "/user/person",
    },
  ];
  return (
    <div
      className="flex  mx-auto items-center  box-border"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "2.6vh 2.2vw",
        borderRadius: "12px",
        boxShadow: "6px 6px 12px #DEDEDE",
        border: "1px solid  #DEDEDE",
      }}
    >
      {data.map((item, index) => {
        const { icon, content, key } = item;
        return (
          <div
            key={index}
            onClick={() => navigate(key)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "13vw",
            }}
          >
            <img
              style={{ width: "2.6vw" }}
              src={require(`../../assets/userIconTemp/${icon}.png`)}
            />
            <div
              style={{
                width: "50%",
                fontSize: "1.4vw",
                marginLeft: "0.5vw",
                color: "#9FA6AC",
              }}
            >
              {content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default UserHeader;
