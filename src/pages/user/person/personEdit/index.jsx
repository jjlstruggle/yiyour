import React, { useEffect, useState, useContext } from "react";
import { Input, Button, Select, DatePicker, Avatar } from "antd";
import UserContext from "@/context/user";
import useLazy from "@/hooks/useLazy";
const Myavatar = useLazy(import("@/components/user/upload"));
const { TextArea } = Input;
export default function PersonEdit({ asyncUserInfo }) {
  const { user, dispatchUserInfo } = useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    console.log(user);
  }, []);
  const editButton = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div>
      {isEdit ? (
        <Myavatar pic={avatarUrl} setPic={setAvatarUrl} />
      ) : (
        <Avatar size={64} src={avatarUrl ? avatarUrl : user.userInfo.avatar} />
      )}
      <div
        className="md:flex md:flex-col md:text-base"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gridTemplateRows: "repeat(3, minmax(0, 1fr))",
          columnGap: "72px",
          width: "72vw",
          padding: "0 6vw",
          rowGap: "20px",
          marginTop: "20px",
        }}
      >
        <div className=" relative flex items-center">
          <div
            className="absolute "
            style={{ left: "-36px", color: "#636363" }}
          >
            昵称
          </div>
          {isEdit ? (
            <Input style={{ width: "240px" }} />
          ) : (
            <div className="h-10">{asyncUserInfo.username}</div>
          )}
        </div>
        <div className=" relative flex items-center">
          {" "}
          <div className="absolute " style={{ left: "-36px" }}>
            性别
          </div>
          {isEdit ? (
            <Select
              defaultValue="保密"
              style={{ width: "240px" }}
              // onChange={handleChange}
            >
              <Option value="保密">保密</Option>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          ) : (
            <div className="h-10">{asyncUserInfo.gender}</div>
          )}
        </div>
        {/* <div className=" relative flex items-center">
          <div className="absolute " style={{ left: "-36px" }}>
            生日
          </div>
          {isEdit ? (
            <DatePicker
              placeholder="请输入生日…"
              //   onChange={onChange}
              style={{ width: "240px" }}
            />
          ) : (
            <div></div>
          )}
        </div> */}
        <div className=" relative flex items-center">
          {" "}
          <div className="absolute " style={{ left: "-36px" }}>
            城市
          </div>
          {isEdit ? (
            <Input placeholder="请输入城市…" style={{ width: "240px" }} />
          ) : (
            <div className="h-10">{asyncUserInfo.city}</div>
          )}
        </div>
        <div className=" relative flex items-center">
          {" "}
          <div className="absolute " style={{ left: "-36px" }}>
            职业
          </div>
          {isEdit ? (
            <Input placeholder="请输入职业…" style={{ width: "240px" }} />
          ) : (
            <div></div>
          )}
        </div>
        <div className=" relative flex items-center md:mt-2">
          {" "}
          <div className="absolute " style={{ left: "-72px" }}>
            单位/学校
          </div>
          {isEdit ? (
            <Input placeholder="请输入单位/学校…" style={{ width: "240px" }} />
          ) : (
            <div className="h-10 ">{asyncUserInfo.organization}</div>
          )}
        </div>
      </div>
      <div
        className=" relative flex"
        style={{
          marginTop: "20px",
          width: "72vw",
          padding: "0 6vw",
          justifyContent: "",
        }}
      >
        {isEdit ? (
          <TextArea
            autoSize={{ minRows: "4" }}
            style={{ width: "520px" }}
            placeholder="介绍一下自己…"
          />
        ) : (
          <div>{asyncUserInfo.introduction}</div>
        )}
      </div>
      <div
        style={{
          marginTop: "20px",
          width: "72vw",
          padding: "0 6vw",
          justifyContent: "start",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Button
          onClick={editButton}
          style={{ backgroundColor: "#62D7D6", color: "#FFFFFF" }}
        >
          {isEdit ? "保存" : "修改"}
        </Button>
        <Button
          style={{
            color: "#636363",
            backgroundColor: "#FFFFFF",
            marginLeft: "30px",
            display: `${isEdit ? "flex" : "none"}`,
          }}
        >
          {" "}
          取消
        </Button>
      </div>
    </div>
  );
}
