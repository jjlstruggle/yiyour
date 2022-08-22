import { PlusCircleFilled } from "@ant-design/icons";
import { Image, Upload, Button } from "antd";
import type { RcFile } from "antd/es/upload";
import { Dispatch, SetStateAction, useState } from "react";

const uploadButton = (
  <div>
    <PlusCircleFilled className="text-yel text-lg" />
    <div className="mt-2 text-base font-normal text-black">上传封面</div>
  </div>
);

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function GoodUpload({
  setFileList,
  fileList,
  type,
  accept,
}: {
  setFileList: Dispatch<SetStateAction<RcFile[]>>;
  fileList: RcFile[];
  type: "card" | "default";
  accept?: string[];
}) {
  const [preview, setPreview] = useState<string[]>([]);

  return (
    <div className="flex">
      {type === "card" &&
        preview.map((item, index) => (
          <Image src={item} key={index} style={{ width: 104, height: 104 }} />
        ))}
      <Upload
        className="ml-4"
        listType={type === "card" ? "picture-card" : "text"}
        accept={type === "card" ? "image/*" : accept!.join(",")}
        fileList={fileList}
        showUploadList={type === "default"}
        beforeUpload={async (file) => {
          const base64 = await Promise.all(
            [...fileList, file].map(async (item) => await getBase64(item))
          );
          setPreview(base64);
          setFileList([...fileList, file]);
          return false;
        }}
        onRemove={(file) => {
          // @ts-ignore
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
        }}
      >
        {fileList.length >= 3 ? null : type === "card" ? (
          uploadButton
        ) : (
          <Button type="primary">点击上传文件</Button>
        )}
      </Upload>
    </div>
  );
}
