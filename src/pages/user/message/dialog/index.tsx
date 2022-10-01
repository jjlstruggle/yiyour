import { Input, Button, Avatar, message, Upload, Pagination, Card } from "antd";
import { UserOutlined, CloseOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";
import DialogContext from "@/context/dialog";
import {
  useEffect,
  useState,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";
import { getHisMes } from "@/api/mes";
import { use } from "i18next";
export default function Dialog({ toUserId }: any) {
  const { Search } = Input;
  const [inputValue, setInputValue] = useState("");
  const { dialog, dispatchDialogInfo } = useContext(DialogContext);
  let user: any = localStorage.getItem("user");
  let { id } = JSON.parse(user);
  const mesDiv: any = useRef(null);
  const [mesHis, setMesHis] = useState([]);
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
          toUserId: toUserId,
          content: inputValue,
          sendTime: "2022-08-22 14:12:21",
        })
      );
      (async () => {
        let res = await getHisMes({
          current: 1,
          size: 10,
          toUserId: toUserId,
        });
        console.log(res.data, "res.datares.datares.datares.data");
        if (res.code === "0") {
          setMesHis(res.data.list);
        }
        mesDiv.current.scrollTop = mesDiv.current.scrollHeight;
      })();
      console.log("消息发送成功");
    }

    setInputValue("");
  };
  useLayoutEffect(() => {
    (async () => {
      let res = await getHisMes({
        current: 1,
        size: 10,
        toUserId: toUserId,
      });
      if (res.code === "0") {
        setMesHis(res.data.list);
      }
    })();
  }, [dialog]);

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
                <h2 className="ml-7 translate-y-1">{toUserId}</h2>
              </div>
            }
            bordered={true}
            extra={
              <div
                onClick={() => {
                  dispatchDialogInfo({ open: false });
                }}
                onTouchStart={() => {
                  dispatchDialogInfo({ open: false });
                }}
              >
                {""}
                <CloseOutlined
                  className=" relative -left-6 hover:cursor-pointer"
                  style={{ fontSize: "26px", color: "#08c" }}
                />
              </div>
            }
            style={{
              width: "70vw",
              maxWidth: 800,
              height: 520,
              border: "2px solid #787878",
              backgroundColor: "#FEFEFE",
            }}
            className=" z-50 b ml-7 absolute l-1/2 t-1/2 translate-x-20 -translate-y-10"
            loading={false}
          >
            <div
              ref={mesDiv}
              className=" overflow-y-auto  h-80 px-3 py-3 flex flex-col text-lg"
            >
              {mesHis.map((item: any, index: number) => {
                if (id == item.receiveUserId) {
                  return (
                    <div key={index} className=" mt-1  self-end">
                      <div>{item.sendTime}</div>
                      <div
                        style={{
                          border: "1px solid #3333",
                          padding: "5px 30px",
                          borderRadius: "10px",
                          maxWidth: "300px",
                          whiteSpace: "pre-wrap",
                          wordWrap: "break-word",
                        }}
                      >
                        {item.content}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className=" mt-1  self-start ">
                      <div>{item.sendTime}</div>
                      <div
                        style={{
                          border: "1px solid #3333",
                          padding: "5px 30px",
                          borderRadius: "10px",
                          maxWidth: "300px",
                          whiteSpace: "pre-wrap",
                          wordWrap: "break-word",
                        }}
                      >
                        {item.content}
                      </div>
                    </div>
                  );
                }
              })}
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
