import { PlusCircleFilled } from "@ant-design/icons";
import { Image, Upload, Button, Avatar, message } from "antd";
import type { RcFile } from "antd/es/upload";
import { Dispatch, SetStateAction, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function UserUpload({ pic, setPic }: any) {
  const [preview, setPreview] = useState<string>("");
  return (
    <div className="flex ">
      {preview ? (
        <Avatar size={64} src={preview} />
      ) : (
        <Avatar size={64} icon={<PlusOutlined />} />
      )}
      <Upload
        maxCount={1}
        action={"http://47.96.86.132:88/api-oss/"}
        className="border-solid  rounded-md my-3 w-28 h-10 bg-main text-white text-sm ml-6 flex justify-center items-center"
        // listType={"picture-card"}
        accept={"image/*"}
        showUploadList={false}
        beforeUpload={async (file) => {
          const base64 = await getBase64(file);
          setPreview(base64);

          // return false;
        }}
        onChange={(info) => {
          if (info.file.status !== "uploading") {
            console.log(info);
          }
          if (info.file.status === "done") {
            console.log(123);

            message.success(`${info.file.name} 文件上传成功`);
            setPic(info.file.response.data.realUrl);
            console.log(info.file.response.data.realUrl);
          } else if (info.file.status === "error") {
            message.error(`${info.file.name} 文件上传失败`);
          }
        }}
      >
        <Button type="primary" className="bg-main">
          更换头像
        </Button>
      </Upload>
    </div>
  );
}
