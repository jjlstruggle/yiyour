import { Input, Button, Avatar, message, Upload, Pagination, Card } from "antd";
import { UserOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";
import DialogContext from "@/context/dialog";
import { useEffect, useState, useContext } from "react";
export default function Dialog({ ws }: any) {
  const { Search } = Input;
  const [inputValue, setInputValue] = useState("");
  const { dialog, dispatchDialogInfo } = useContext(DialogContext);
  const [mesHis, setMesHis] = useState("");
  let token: any = localStorage.getItem("token");
  var ws: any = new WebSocket("ws://47.96.86.132:88/api-websocket/chat", token);
  ws.onopen = function (res: any) {
    console.log("消息连接成功", res);
  };
  ws.onmessage = function (res: any) {
    if (JSON.parse(res.data).code === 1) {
      // 刷新统计数据
      console.log("获取数据成功", res.data);
    }
  };
  const sendMes = () => {
    if (ws.readyState === 1) {
      ws.send(
        JSON.stringify({
          isSystem: 0,
          toUserId: 1851,
          content: inputValue,
          sendTime: new Date().toLocaleDateString(),
        })
      );

      console.log("消息发送成功");
    }

    setInputValue("");
  };
  return (
    <div className=" z-50">
      <Draggable handle=".ant-card-head">
        <div>
          <Card
            headStyle={{ borderBottom: "2px solid #787878" }}
            title={
              <div className="flex items-center">
                {" "}
                <Avatar
                  size={64}
                  className="flex justify-center items-center"
                  icon={<UserOutlined />}
                />
                <h2 className="ml-7 translate-y-1">用户名</h2>
              </div>
            }
            bordered={true}
            extra={
              <div
                onDoubleClick={() => {
                  dispatchDialogInfo({ open: false });
                }}
                onTouchStart={() => {
                  console.log(123);

                  dispatchDialogInfo({ open: false });
                }}
              >
                {" "}
                <ArrowRightOutlined
                  className=" relative -left-6"
                  style={{ fontSize: "26px", color: "#08c" }}
                />
              </div>
            }
            style={{
              width: 800,
              height: 520,
              border: "2px solid #787878",
              backgroundColor: "#FEFEFE",
            }}
            className=" z-50 b ml-7 absolute l-1/2 t-1/2 translate-x-20 -translate-y-10"
            loading={false}
          >
            <div className=" overflow-y-auto  h-80 px-3 py-3">
              {/* <p>Card content</p>
              <p>Card content</p> <p>Card content</p> <p>Card content</p>{" "}
              <p>Card content</p> <p>Card content</p> <p>Card content</p>{" "}
              <p>Card content</p> <p>Card content</p> <p>Card content</p>{" "}
              <p>Card content</p> <p>Card content</p> <p>Card content</p>{" "}
              <p>Card content</p> <p>Card content</p> <p>Card content</p>{" "}
              <p>Card content</p> <p>Card content</p> <p>Card content</p>{" "}
              <p>Card content</p> <p>Card content</p> <p>Card content</p>{" "}
              <p>Card content</p> <p>Card content</p> <p>Card content</p>{" "}
              <p>Card content</p> <p>Card content</p> <p>Card content</p>{" "}
              <p>Card content</p> <p>Card content</p> <p>Card content</p>{" "}
              <p>Card content</p> */}
            </div>
            <Input
              value={inputValue}
              onChange={(e: any) => {
                setInputValue(e.target.value);
              }}
              className=" absolute bottom-3 w-4/5  h-10 text-xl"
              placeholder="开始聊天沟通!"
            />
            <Button
              className=" absolute bottom-3 text-white text-sm right-10 w-20 h-10 bg-main"
              size="middle"
              onClick={sendMes}
            >
              发送
            </Button>
          </Card>
        </div>
      </Draggable>
    </div>
  );
}
