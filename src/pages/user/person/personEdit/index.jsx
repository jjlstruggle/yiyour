import React, { useEffect, useState, useContext } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import UserContext from "@/context/user";
import useLazy from "@/hooks/useLazy";
const Myavatar = useLazy(import("@/components/user/upload"));
const { TextArea } = Input;
export default function PersonEdit() {
  const { user, dispatchUserInfo } = useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <div>
      <Myavatar pic={avatarUrl} setPic={setAvatarUrl} />
      <div
        className="md:grid-cols-1"
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
          <Input style={{ width: "240px" }} />
        </div>
        <div className=" relative flex items-center">
          {" "}
          <div className="absolute " style={{ left: "-36px" }}>
            性别
          </div>
          <Select
            defaultValue="保密"
            style={{ width: "240px" }}
            // onChange={handleChange}
          >
            <Option value="保密">保密</Option>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </div>
        <div className=" relative flex items-center">
          {" "}
          <div className="absolute " style={{ left: "-36px" }}>
            生日
          </div>
          <DatePicker
            //   onChange={onChange}
            style={{ width: "240px" }}
          />
        </div>
        <div className=" relative flex items-center">
          {" "}
          <div className="absolute " style={{ left: "-36px" }}>
            城市
          </div>
          <Input placeholder="请输入城市…" style={{ width: "240px" }} />
        </div>
        <div className=" relative flex items-center">
          {" "}
          <div className="absolute " style={{ left: "-36px" }}>
            职业
          </div>
          <Input placeholder="请输入职业…" style={{ width: "240px" }} />
        </div>
        <div className=" relative flex items-center">
          {" "}
          <div className="absolute " style={{ left: "-72px" }}>
            单位/学校
          </div>
          <Input placeholder="请输入单位/学校…" style={{ width: "240px" }} />
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
        <TextArea
          autoSize={{ minRows: "4" }}
          style={{ width: "520px" }}
          placeholder="介绍一下自己…"
        />
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
        <Button style={{ backgroundColor: "#62D7D6", color: "#FFFFFF" }}>
          保存{" "}
        </Button>
        <Button
          style={{
            color: "#636363",
            backgroundColor: "#FFFFFF",
            marginLeft: "30px",
          }}
        >
          {" "}
          取消
        </Button>
      </div>
    </div>
  );
}
