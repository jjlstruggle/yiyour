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
  useCallback,
} from "react";
import { getHisMes } from "@/api/mes";
import { use } from "i18next";
import { resolve } from "path";
export default function Dialog({ toUserId }: any) {
  const [inputValue, setInputValue] = useState("");
  const { dialog, dispatchDialogInfo } = useContext(DialogContext);
  let user: any = localStorage.getItem("user");
  let { id } = JSON.parse(user);
  const mesDiv: any = useRef(null);
  const [mesHis, setMesHis]: [any, any] = useState([]);
  let token: any = localStorage.getItem("token");
  const ws = useRef<WebSocket | null>(null);
  const sendMes = () => {
    let sendTime = `${new Date()
      .toLocaleDateString()
      .replace(/\//g, "-")} ${new Date().toTimeString().match(/.{8}/)}`;
    console.log(toUserId, "toUserId");

    if (ws.current?.readyState === 1) {
      let data = JSON.stringify({
        isSystem: 0,
        toUserId: toUserId,
        content: inputValue,
        sendTime: sendTime,
      });
      ws.current.send(data);
      let mockData = {
        content: inputValue,
        fromUserId: id,
        receiveUserId: toUserId,
        sendTime: sendTime,
      };
      new Promise((resolve, rejected) => {
        resolve(123);
        setMesHis([...mesHis, mockData]);
      }).then((res) => {
        mesDiv.current.scrollTop = mesDiv.current.scrollHeight;
      });
      console.log("消息发送成功");
    }
    setInputValue("");
  };
  const flushed = () => {
    (async () => {
      let res = await getHisMes({
        current: 1,
        size: 200,
        toUserId: toUserId,
      });
      if (res.code === "0") {
        new Promise((resolve, rejected) => {
          setMesHis(() => {
            resolve(123);
            return res.data.list;
          });
        }).then((res) => {
          setTimeout(() => {
            mesDiv.current.scrollTop = mesDiv.current.scrollHeight;
          });
        });
      }
    })();
  };
  useLayoutEffect(() => {
    ws.current = new WebSocket(
      "ws://47.96.86.132:88/api-websocket/chat",
      token
    );
    ws.current.onopen = function () {
      console.log("消息连接成功");
      console.log(ws.current?.readyState);
    };
    console.log(ws);
    if (id != toUserId) {
      ws.current.onmessage = (e: any) => {
        flushed();
      };
    } else {
      message.error("不能给自己发信息！");
    }
    console.log(mesHis, "mesHis");
    mesDiv.current.scrollTop = mesDiv.current.scrollHeight;
    return () => {
      ws.current?.close();
    };
  }, [ws.current]);
  useLayoutEffect(() => {
    flushed();
  }, [dialog]);

  return (
    <div className=" z-50 md:w-full">
      <Draggable handle=".ant-card-head">
        <div>
          <Card
            headStyle={{
              boxShadow: "0px 3px 8px #787878",
            }}
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

              backgroundColor: "#FEFEFE",
              boxShadow: "0px 3px 6px #787878",
            }}
            className="md:w-[92vw] md:translate-x-0 z-50 b ml-7 absolute l-1/2 t-1/2 translate-x-20 -translate-y-10"
            loading={false}
          >
            <div
              ref={mesDiv}
              className=" overflow-y-auto  h-80 px-3 py-3 flex flex-col text-lg"
            >
              {mesHis.map((item: any, index: number) => {
                // let sendTime = item.sendTime.match(/(\d*)\-(\d*)\-(\d*)/);
                // let sendTime = item.sendTime
                //   .replace(/(\-)/g, "/")
                //   .match(/\d*.\d*.\d*....../)[0];

                // console.log(item.sendTime);

                if (id == item.fromUserId) {
                  return (
                    <div key={index} className=" mt-1   self-end">
                      <div>{item.sendTime}</div>
                      <div
                        className="bg-[#8FE75C]"
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
