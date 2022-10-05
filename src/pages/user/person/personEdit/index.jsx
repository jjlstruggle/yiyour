import React, { useEffect, useState, useContext } from "react";
import { Input, Button, Select, DatePicker, Avatar, message } from "antd";
import UserContext from "@/context/user";
import useLazy from "@/hooks/useLazy";
const Myavatar = useLazy(import("@/components/user/upload"));
import { postUser } from "@/api/user";
const { TextArea } = Input;
export default function PersonEdit({ asyncUserInfo }) {
  const { user, dispatchUserInfo } = useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = useState(asyncUserInfo.avatar);
  const [isEdit, setIsEdit] = useState(false);
  const [nameValue, setNameValue] = useState(asyncUserInfo.username);
  const [genderValue, setGenderValue] = useState(asyncUserInfo.gender);
  const [cityValue, setCityValue] = useState(asyncUserInfo.city);
  const [jobValue, setJobValue] = useState(asyncUserInfo.job);
  const [organizationValue, setOrganizationValue] = useState(
    asyncUserInfo.organization
  );
  const [introductionValue, setIntroductionValue] = useState(
    asyncUserInfo.introduction
  );
  useEffect(() => {
    console.log(user);
  }, []);
  const editButton = () => {
    setIsEdit(!isEdit);
  };
  const onClickSubmit = () => {
    let fn = async () => {
      let data = {
        username: nameValue,
        gender: genderValue,
        job: jobValue,
        city: cityValue,
        organization: organizationValue,
        introduction: introductionValue,
        avatar: avatarUrl,
      };
      let res = await postUser(data);
      if (res.code == "0") {
        message.success("修改成功", 2000);
        setIsEdit(!isEdit);
      } else {
        message.error("修改出错");
      }
    };
    fn();
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
            昵称:
          </div>
          {isEdit ? (
            <Input
              onChange={(e) => {
                setNameValue(e.target.value);
              }}
              defaultValue={asyncUserInfo.username}
              style={{ width: "240px" }}
            />
          ) : (
            <div className="h-10 flex justify-center items-center  text-base ">
              {asyncUserInfo.username}
            </div>
          )}
        </div>
        <div className=" relative flex items-center">
          {" "}
          <div className="absolute " style={{ left: "-36px" }}>
            性别:
          </div>
          {isEdit ? (
            <Select
              onChange={(e) => {
                console.log(e);
                setGenderValue(e);
              }}
              defaultValue={
                asyncUserInfo.gender ? asyncUserInfo.gender : "保密"
              }
              style={{ width: "240px" }}
              // onChange={handleChange}
            >
              <Option value="保密">保密</Option>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          ) : (
            <div className="h-10 flex justify-center items-center text-base ">
              {asyncUserInfo.gender ? asyncUserInfo.gender : "保密"}
            </div>
          )}
        </div>
        {asyncUserInfo.emailShow ? (
          <div className=" relative flex items-center">
            <div className="absolute " style={{ left: "-36px" }}>
              邮箱:
            </div>
            <div className="h-10 flex justify-center items-center text-base ">
              {asyncUserInfo.email}
            </div>
          </div>
        ) : null}
        {asyncUserInfo.phoneShow ? (
          <div className=" relative flex items-center">
            <div className="absolute " style={{ left: "-36px" }}>
              手机号:
            </div>
            <div className="h-10 flex justify-center items-center text-base ">
              {asyncUserInfo.phone}
            </div>
          </div>
        ) : null}
        <div className=" relative flex items-center">
          {" "}
          <div className="absolute " style={{ left: "-36px" }}>
            城市:
          </div>
          {isEdit ? (
            <Input
              onChange={(e) => {
                setCityValue(e.target.value);
              }}
              defaultValue={asyncUserInfo.city}
              placeholder="请输入城市…"
              style={{ width: "240px" }}
            />
          ) : (
            <div className="h-10 flex justify-center items-center text-base ">
              {asyncUserInfo.city ? asyncUserInfo.city : "外星"}
            </div>
          )}
        </div>
        <div className=" relative flex items-center">
          {" "}
          <div className="absolute " style={{ left: "-36px" }}>
            职业:
          </div>
          {isEdit ? (
            <Input
              onChange={(e) => {
                setJobValue(e.target.value);
              }}
              defaultValue={asyncUserInfo.job}
              placeholder="请输入职业…"
              style={{ width: "240px" }}
            />
          ) : (
            <div>{asyncUserInfo.job ? asyncUserInfo.job : "保密"}</div>
          )}
        </div>
        <div className=" relative flex items-center md:mt-2">
          {" "}
          <div className="absolute " style={{ left: "-72px" }}>
            单位/学校:
          </div>
          {isEdit ? (
            <Input
              onChange={(e) => {
                setOrganizationValue(e.target.value);
              }}
              defaultValue={asyncUserInfo.organization}
              placeholder="请输入单位/学校…"
              style={{ width: "240px" }}
            />
          ) : (
            <div className="h-10 flex justify-center items-center text-base ">
              {asyncUserInfo.organization
                ? asyncUserInfo.organization
                : "神秘组织"}
            </div>
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
            onChange={(e) => {
              setIntroductionValue(e.target.value);
            }}
            defaultValue={asyncUserInfo.introduction}
            autoSize={{ minRows: "4" }}
            style={{ width: "520px" }}
            placeholder="介绍一下自己…"
          />
        ) : (
          <div className="h-10 flex justify-center items-center text-base ">
            {asyncUserInfo.introduction}
          </div>
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
          onClick={() => {
            if (!isEdit) {
              editButton();
            } else {
              onClickSubmit();
            }
          }}
          style={{ backgroundColor: "#62D7D6", color: "#FFFFFF" }}
        >
          {isEdit ? "保存" : "修改"}
        </Button>
        <Button
          onClick={() => {
            setIsEdit(false);
          }}
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
